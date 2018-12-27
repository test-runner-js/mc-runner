const CliApp = require('test-runner-cli')
const TestRunner = require('test-runner')

class MultiCoreCliApp extends CliApp {
  processFiles (files, options) {
    const fork = require('child_process').fork
    const cpus = require('os').cpus().length
    const path = require('path')
    const filesPerCpu = Math.ceil(files.length / cpus)
    while (files.length) {
      const subFiles = files.splice(0, filesPerCpu)
      const sub = fork(path.resolve(__dirname, 'sub.js'))
      sub.send(subFiles)
    }
  }
}

module.exports = MultiCoreCliApp
