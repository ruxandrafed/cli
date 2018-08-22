const pkg = require('../package.json')
const log = require('./log')

exports.get = () => {}
exports.set = () => log.warn('keytar is not installed correctly, not saving password')

try {
  const keytar = require('keytar')

  exports.get = (service, account) => keytar.getPassword(`${pkg.name}:${service}`, account)
  exports.set = (service, account, password) => keytar.setPassword(`${pkg.name}:${service}`, account, password)
} catch (err) {}
