var chokidar = require('chokidar')
import fs from 'fs'
import { init, parse } from 'es-module-lexer/dist/lexer.js';
import path from 'path'
import {totalist} from 'totalist/sync'

let isHiddenFile = (p) => path.basename(p).startsWith('.') || path.basename(p).startsWith('_')

export function watch(toWatch, callback=()=>{}){
  toWatch = path.normalize(toWatch)
  let initialFiles = []
  let watcher
  let dependents = {}

  async function effects(p){
    let counter = 0;
    if(p.includes(toWatch) && !isHiddenFile(p)){
      if(!initialFiles.includes(p)){
        initialFiles.push(p)
      }
      await callback(p, initialFiles)
      counter++;
    }
    if(dependents[p]){
      let promises = []
      dependents[p].forEach(d => {
        promises.push(new Promise((res, rej) => {
          effects(d).then(x => {
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

  async function updateDependents(p){
    await init;
    let source = fs.readFileSync(p, 'utf8')
    let [imps, exps] = parse(source)
    imps = imps.forEach(({ s, e }) => {
      let rawimport = source.substring(s,e)
      // only look for local imports (like './file.js' or '../file.js', not 'external-module')
      if(rawimport.startsWith('.')){
        // ensure .js extension if not included in source
        rawimport = path.extname(rawimport) ? rawimport : rawimport + '.js'
        // convert the import path to be relative to the cwd
        let cwdimport = path.join(p, '../', rawimport)
        
        if(!dependents[cwdimport]){
          dependents[cwdimport] = new Set([p])
          updateDependents(cwdimport)
          watcher.add(cwdimport)
        }
        else {
          dependents[cwdimport].add(p)
        }
      }
    })
  }

  watcher = chokidar.watch(toWatch, {
    ignoreInitial: true
  })
    .on('add', async (p) => {
      await updateDependents(p)
      let changed = await effects(p)
      // console.log(changed)
    })
    .on('change', async (p) => {
      await updateDependents(p)
      let changed = await effects(p)
      // console.log(changed)
    })
  
  totalist(toWatch, (rel) => {
    if(!isHiddenFile(rel)){
      initialFiles.push(path.join(toWatch, rel))
    }
  })
  Promise.all(initialFiles.map(async p => {
    await updateDependents(p)
    let changed = await effects(p)
    // console.log(changed)
  })).then(() => {
    // console.log("READY")
  })
}