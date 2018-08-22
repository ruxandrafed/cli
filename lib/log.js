const chalk = require('chalk')

exports.info = (message, ...args) => console.info(`${chalk.blue('ℹ')}️ ️${message}`, ...args)

exports.warn = (message, ...args) => console.error(`${chalk.orange('✖')}️ ️${message}`, ...args)

exports.success = (message, ...args) => console.log(`${chalk.green('✔')}️ ️${message}`, ...args)

exports.failure = (message, ...args) => console.error(`${chalk.red('✖')}️ ️${message}`, ...args) && process.exit(1)
