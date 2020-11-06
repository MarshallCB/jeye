<div align="center">
  <img src="https://github.com/marshallcb/jeye/raw/main/jeye.png" alt="jeye" width="150" />
</div>

<h1 align="center">jeye</h1>
<div align="center">
  <a href="https://npmjs.org/package/jeye">
    <img src="https://badgen.now.sh/npm/v/jeye" alt="version" />
  </a>
</div>

<div align="center">Folder watcher that also watches dependencies</div>

## Use Cases
- Smart dev builder (rebuild files any time source files change or dependency file changes)
- Rebuild bundle if any files in source directory or any dependencies of those files changes

# Usage

## Installation

NodeJS
```js
// CJS
var { watch } = require('jeye');
// ES6
import { watch } from 'jeye';

watch('source', (changed, total) => {
  console.log(changed, total)
})
```

## API

### `watch(source_directory, callback)`

- `source_directory` : Directory which contains scripts you want to watch for changes and dependency changes
- `callback(path, total)`
  - `path` : path is the path (relative to cwd) to the file that is effectively changed (changed or dependency changed)
  - `total` : array of all paths in source_directory (in case of aggregate operation)

## License

MIT © [Marshall Brandt](https://m4r.sh)
