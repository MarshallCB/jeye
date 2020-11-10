var chokidar = require('chokidar')
import { promises as fs } from 'fs'
import { init, parse } from 'es-module-lexer/dist/lexer.js';
import path from 'path'
import {totalist} from 'totalist'

function isHidden(p, ignore, only){
  // Ignore only if ignore is set and ignore test passes
  let shouldIgnore = ignore && ignore.test(p)
  // if only isn't set, include everything. Otherwise, must pass only test
  let shouldInclude = !only || only.test(p)
  // file is hidden if it shouldn't be included OR it should be ignored
  return !shouldInclude || shouldIgnore
}

async function file_info(p){
  await init;
  let js = (path.extname(p) === '.js')
  let contents = await fs.readFile(p)
  let [imports, exports] = js ? parse(contents.toString('utf8')) : [null,null]
  return { imports, exports, contents, js }
}

class Jeye{
  constructor(source, options={}){
    Object.assign(this, {
      sources: (Array.isArray(source) ? source : [source]).map(path.normalize),
      options,
      targets: {},
      dependents: {},
      subscribers: {}
    })
    this.watcher = chokidar.watch(this.sources, {
      ...options.chokidar,
      ignoreInitial: true
    }).on('add', async (p) => {
      await this.updateDependents(p)
      let changed = await this.effects(p)
      this.dispatch('aggregate', this.targets, changed)
    }).on('change', async (p) => {
      await this.updateDependents(p)
      let changed = await this.effects(p)
      this.dispatch('aggregate', this.targets, changed)
    }).on('unlink', async (p) => {
      Object.keys(this.dependents).forEach(k => {
        this.dependents[k].delete(p)
        if(this.dependents[k].size === 0){
          delete this.dependents[k]
        }
      })
      delete this.dependents[p]
      this.dispatch('remove', p)
    }).on('unlinkDir', async (p) => {
      let changed = [];
      Object.keys(this.dependents).forEach(k => {
        this.dependents[k].forEach(dep => {
          if(dep.startsWith(p)){
            this.dependents[k].delete(dep)
            changed.push(dep)
          }
        })
        if(this.dependents[k].size === 0){
          delete this.dependents[k]
        }
      })
      this.dispatch('remove', p)
    })

    this.init().then(() => {
      this.dispatch('ready', this.targets)
    }).catch(e => {
      this.dispatch('error', "Error initializing jeye")
    })
    this.updateDependents = this.updateDependents.bind(this)
    this.effects = this.effects.bind(this)
  }

  isTarget(p){
    return this.sources.some(s => p.includes(s)) && !isHidden(p, this.options.ignore, this.options.only)
  }

  async init(){
    await init;
    this.targets = await targets(this.sources, this.options)
    await Promise.all(Object.keys(this.targets).map(this.updateDependents))
  }


  async effects(p){
    let changes = [];
    // if in source directory and isn't hidden
    if(this.isTarget(p)){
      // fire 'change' event and wait for completion
      await this.dispatch('change', p, this.targets[p])
      // increment changes (1 target changed so far)
      changes.push(p);
    }
    if(this.dependents[p]){
      let effect = async function(dep){
        let nested_changes = await this.effects(dep)
        changes = changes.concat(nested_changes)
      }.bind(this)
      let promises = []
      this.dependents[p].forEach(dep => {
        promises.push(effect(dep))
      })
      await Promise.all(promises)
    }
    return changes;
  }

  async updateDependents(p){
    let info = await file_info(p)
    if(this.isTarget(p)){
      this.targets[p] = info
      this.watcher.add(p)
    }
    let updateDependents = this.updateDependents
    if(info.js){
      let promises = info.imports.map(async function({ s, e }){
        let import_str = info.contents.toString('utf8').substring(s,e)
        // only look for local imports (like './file.js' or '../file.js', not 'external-module')
        if(import_str.startsWith('.')){
          // ensure .js extension if not included in import statement
          import_str = import_str.endsWith('.js') ? import_str : import_str + '.js'
          // convert the import path to be relative to the cwd
          let import_path = path.join(p, '../', import_str)
          
          // if we haven't already tracked this file
          if(!this.dependents[import_path]){
            this.dependents[import_path] = new Set([p])
            // recursively search for dependencies to trigger file changes
            await this.updateDependents(import_path)
            // watch dependency for file changes
            this.watcher.add(import_path)
          }
          else {
            // ensure this path is included in dependency's dependents
            this.dependents[import_path].add(p)
          }
        }
      }.bind(this))
    }
  }

  async dispatch(event, ...args){
    if(this.subscribers[event]){
      let promises = []
      this.subscribers[event].forEach(callback => {
        // if callback is async, it will return a promise
        promises.push(callback.apply(null,args))
      })
      await Promise.all(promises)
    }
    
  }

  on(event, callback){
    if(this.subscribers[event]){
      this.subscribers[event].add(callback)
    } else {
      this.subscribers[event] = new Set([callback])
    }
    return this;
  }
  
}

export function watch(source, options){
  return new Jeye(source, options);
}

export async function targets(sources=[], options={}){
  let targets = {}
  let paths = []

  // await for paths to be filled with all files in sources
  let promises = []
  sources.map(async src => {
    await totalist(src,  (rel) => {
      path.push(path.join(sources[i], rel))
    })
  })
  await Promise.all(promises) 

  // for each path, await the file_info and fill targets
  await Promise.all(paths.map(async p => {
    targets[p] = await file_info(p)
  }))
  
  return targets
}