var chokidar = require('chokidar')
import fs from 'fs'
import { init, parse } from 'es-module-lexer/dist/lexer.js';
import path from 'path'
import {totalist} from 'totalist/sync'

class Jeye{
  constructor(source, options){
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
    let initialPromises = []
    totalist(this.source, (rel) => {
      let p = path.join(this.source, rel)
      if(!this.isHidden(p)){
        initialPromises.push(new Promise((res, rej) => {
          this.updateDependents(p).then(() => {
            res()
          })
        }))
      }
    })
    Promise.all(initialPromises).then(() => {
      console.log(this.targets)
      this.dispatch('ready', this.targets)
    })
  }

  isHidden(p){
    let shouldIgnore = this.options.ignore && this.options.ignore.test(p)
    let shouldInclude = !this.options.only || this.options.only.test(p)
    return !(shouldInclude && !shouldIgnore)
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