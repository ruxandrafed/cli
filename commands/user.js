exports.command = 'user'

exports.describe = 'process user repos'

exports.builder = require('../lib/options')

exports.handler = require('../lib/process')
