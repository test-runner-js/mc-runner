process.once('message', run)

function getTom (files) {
  const path = require('path')
  const toms = files.map(file => {
    const tom = require(path.resolve(process.cwd(), file))
    if (tom) {
      return tom
    } else {
      throw new Error('No TOM exported: ' + file)
    }
  })
  const name = 'portion'
  const Tom = require('test-object-model')
  return Tom.combine(toms, name)
}

function run (files) {
  const tom = getTom(files)
  const TestRunner = require('test-runner')
  const runner = new TestRunner({ tom })
  runner.start()
}
