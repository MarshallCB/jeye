var chokidar = require('chokidar')
import fs from 'fs'
import { init, parse } from 'es-module-lexer/dist/lexer.js';
import path from 'path'
import {totalist} from 'totalist/sync'

function isHidden(p, ignore, only){
  // Ignore only if ignore is set and ignore test passes
  let shouldIgnore = ignore && ignore.test(p)
  // if only isn't set, include everything. Otherwise, must pass only test
  let shouldInclude = !only || only.test(p)
  // file is hidden if it shouldn't be included OR it should be ignored
  return !shouldInclude || shouldIgnore
}

class Jeye{
  constructor(source, options={}){
    Object.assign(this, {
      source: path.normalize(source),
      options,
      targets: {},
      dependents: {},
      subscribers: {}
    })
    this.watcher = chokidar.watch([], {
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
      // remove chain
      Object.keys(this.dependents).forEach(k => {
        this.dependents[k].delete(p)
        if(this.dependents[k].size === 0){
          delete this.dependents[k]
        }
      })
      delete this.dependents[p]
      this.dispatch('remove', p)
    })
    let initialPromises = targets(this.source, this.options).map(({ rel }) => 
      new Promise((res, rej) => {
        this.updateDependents(rel).then(res)
      })
    )
    Promise.all(initialPromises).then(() => {
      this.dispatch('ready', this.targets)
    })
  }

  isHidden(p){
    return isHidden(p, this.options.ignore, this.options.only)
  }

  async effects(p){
    let counter = 0;
    // if in source directory and isn't hidden
    if(p.includes(this.source) && !this.isHidden(p)){
      // fire 'change' event and wait for completion
      await this.dispatch('change', p, this.targets[p])
      // increment counter (1 target changed so far)
      counter++;
    }
    if(this.dependents[p]){
      let promises = []
      this.dependents[p].forEach(dep => {
        promises.push(new Promise((res, rej) => {
          // trigger effects() recursively of each dependent file
          this.effects(dep).then(x => {
            // count affected targets (returned by effects())
            counter += x;
            res()
          })
        }))
      })
      return Promise.all(promises).then(() => {
        return counter;
      })
    }
    return counter;
  }

  async updateDependents(p){
    if(path.extname(p) !== '.js') return;
    await init;
    let code = fs.readFileSync(p, 'utf8')
    let [imps, exps] = parse(code)
    if(p.includes(this.source) && !this.isHidden(p)){
      // ensure this file is included in "all target files"
      this.targets[p] = { imports: imps, exports: exps, code }
      this.watcher.add(p)
    }
    imps = imps.forEach(({ s, e }) => {
      let import_str = code.substring(s,e)
      // only look for local imports (like './file.js' or '../file.js', not 'external-module')
      if(import_str.startsWith('.')){
        // ensure .js extension if not included in import statement
        import_str = import_str.endsWith('.js') ? import_str : import_str + '.js'
        // convert the import path to be relative to the cwd
        let cwdimport = path.join(p, '../', import_str)
        
        if(!this.dependents[cwdimport]){
          this.dependents[cwdimport] = new Set([p])
          // recursively search for dependencies to trigger file changes
          this.updateDependents(cwdimport)
          // watch dependency for file changes
          this.watcher.add(cwdimport)
        }
        else {
          // ensure this path is included in dependency's dependents
          this.dependents[cwdimport].add(p)
        }
      }
    })
  }

  dispatch(event, ...args){
    this.subscribers[event].forEach(callback => {
      callback.apply(null, args)
    })
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

export function targets(source, options={}){
  let targets = []
  totalist(source, (rel) => {
    if(!isHidden(rel, options.ignore, options.only)){
      targets.push({
        // to be used when building to another folder
        id: rel,
        // path to source file relative to cwd
        rel: path.join(source, rel)
      })
    }
  })
  return targets
}