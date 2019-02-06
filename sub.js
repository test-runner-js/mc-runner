process.once('message', run)

function getTom (files, cpuIndex) {
  const path = require('path')
  const toms = files.map(file => {
    const tom = require(path.resolve(process.cwd(), file))
    if (tom) {
      return tom
    } else {
      throw new Error('No TOM exported: ' + file)
    }
  })
  const name = 'CPU ' + cpuIndex
  const Tom = require('test-object-model')
  return Tom.combine(toms, name)
}

function run (data) {
  const tom = getTom(data.files, data.cpuIndex)
  if (data.options.tree) {
    console.log(tom.tree())
  } else {
    const TestRunner = require('test-runner-core')
    const runner = new TestRunner({ tom, view: require('test-runner/lib/view-tap') })
    runner.start()
  }
}
