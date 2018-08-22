exports.command = 'org <name>'

exports.describe = 'process org repos'

exports.builder = require('../lib/options')

exports.handler = require('../lib/process')
