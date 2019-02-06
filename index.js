const TestRunner = require('test-runner')

class MultiCoreTestRunner extends TestRunner {
  processFiles (files, options) {
    const fork = require('child_process').fork
    const cpus = require('os').cpus().length
    const path = require('path')
    const filesPerCpu = Math.ceil(files.length / cpus)
    let cpuIndex = 0
    while (files.length) {
      const subFiles = files.splice(0, filesPerCpu)
      const sub = fork(path.resolve(__dirname, 'sub.js'))
      cpuIndex++
      sub.send({ files: subFiles, options, cpuIndex })
    }
  }
}

module.exports = MultiCoreTestRunner
