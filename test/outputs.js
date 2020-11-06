var { watch } = require('../dist/index')

watch('test/routes', (changed, total) => {
  console.log(changed)
})
