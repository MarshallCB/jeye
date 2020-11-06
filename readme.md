<div align="center">
  <img src="https://github.com/marshallcb/jeye/raw/main/jeye.png" alt="jeye" width="75" />
</div>

<h1 align="center">jeye</h1>
<div align="center">
  <a href="https://npmjs.org/package/jeye">
    <img src="https://badgen.now.sh/npm/v/jeye" alt="version" />
  </a>
</div>

<div align="center">Folder watcher that also watches dependencies</div>

## Overview
- Watch .js files and their dependencies for changes (combination of [`chokidar`](https://github.com/paulmillr/chokidar) and [`esm-module-lexer`](https://github.com/guybedford/es-module-lexer))
- Run singular callbacks and aggregate callbacks
- Requires JS files to be written in ES6 syntax (for import/export analysis)

## Usage

```js
// CJS
var { watch } = require('jeye');
// ES6
import { watch } from 'jeye';

watch('source', {
  ignore: /(^|[\/\\])[\._]./,
  only: /\w+\.js$/
}).change((p, { exports }) => {

}).remove(p => {
  
}).aggregate((total) => {

})
```

## API

### `watch(source, options?)`

- `source` : `[String]` or `String` pointing to either directories or individual files
- `options`
  - `ignore`: Regex to match all filenames that should be ignored
  - `only`: Regex to match all files that should be included
  - `chokidar`: Object to be passed to chokidar options [API](https://github.com/paulmillr/chokidar#api)

### .change(callback)

- `callback` : `async (path, { imports, exports }) => { }`
  - `path` : path relative to cwd of the changed file
  - `imports` : list of imports exported by the changed file (from [`esm-module-lexer`](https://github.com/guybedford/es-module-lexer))
  - `exports` : list of exports exported by the changed file (from [`esm-module-lexer`](https://github.com/guybedford/es-module-lexer))

### .remove(callback)

- `callback` : `async (path) => { }`
  - `path` : path relative to cwd of the deleted file

### .aggregate(callback)

- `callback` : `(total) => { }`
  - `total`: Object with the paths as keys and `{ imports, exports }` as value


## License

MIT © [Marshall Brandt](https://m4r.sh)
