#!/usr/bin/env node
const McRunnerCli = require('../')
const cli = new McRunnerCli()
cli.start().catch(err => {
  console.error(err)
  process.exitCode = 1
})
