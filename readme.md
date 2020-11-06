<div align="center">
  <img src="https://github.com/marshallcb/jeye/raw/main/jeye.png" alt="jeye" width="75" />
</div>

<h1 align="center">jeye</h1>
<div align="center">
  <a href="https://npmjs.org/package/jeye">
    <img src="https://badgen.now.sh/npm/v/jeye" alt="version" />
  </a>
</div>

<div align="center">File watcher that also watches dependencies</div>

## Overview
- Watch .js files and their dependencies for changes (combination of [`chokidar`](https://github.com/paulmillr/chokidar) and [`esm-module-lexer`](https://github.com/guybedford/es-module-lexer))
- Run singular callbacks and aggregate callbacks
- Requires JS files to be written in ES6 syntax (for import/export analysis)
- Great for bundle-less build tooling

## Usage

```js
// CJS
var { watch } = require('jeye');
// ES6
import { watch } from 'jeye';

watch('source', {
  ignore: /(^|[\/\\])[\._]./    //ignore dot files and files with underscore prefix (_hidden.js)
}).on('change', (p, { exports, imports, code }) => {
  console.log(p + ' changed')
}).on('remove', p => {
  console.log(p + ' removed')
}).on('aggregate', (targets, changed) => {
  console.log(changed + ' files changed')
}).on('ready', (targets) => {
  console.log("READY")
})
```

## API

### `watch(source, options?)`

- `source` : `[String]` or `String` pointing to either directories or individual files
- `options`
  - `ignore`: Regex to match all filenames that should be ignored
  - `only`: Regex to match all files that should be included
  - `chokidar`: Object to be passed to chokidar options [API](https://github.com/paulmillr/chokidar#api)

### .on(event, callback)

Returns instance of watcher (to allow for chained listeners)

#### Events:

- `change` : `(path, scriptInfo) => { }`
  - `path` : path relative to cwd of the changed file
  - `scriptInfo` : only available for JS files with ES6 syntax
    - `imports` : list of imports exported by the changed file (from [`esm-module-lexer`](https://github.com/guybedford/es-module-lexer))
    - `exports` : list of exports exported by the changed file (from [`esm-module-lexer`](https://github.com/guybedford/es-module-lexer))
    - `code` : String of source code for that file (using utf8 encoding)

- `remove` : `(path) => { }`
  - `path` : path relative to cwd of the deleted file

- `aggregate` : `(total, changed) => { }`
  - `total`: Object with all target paths as keys and `{ imports, exports, code }` as value
  - `changed`: Number of target files affected by the most recent edit

- `ready` : `(total, changed) => { }`
  - `total`: Object with all target paths as keys and `{ imports, exports, code }` as value


## License

MIT © [Marshall Brandt](https://m4r.sh)