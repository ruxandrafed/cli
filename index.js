#!/usr/bin/env node

require('yargs') // eslint-disable-line no-unused-expressions
  .commandDir('commands')
  .demandCommand()
  .help()
  .parse()
