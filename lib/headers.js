const pkg = require('../package.json')

// default headers for github api calls
module.exports = {
  'user-agent': `${pkg.name} v${pkg.version}`
}
