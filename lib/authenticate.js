const inquirer = require('inquirer')

const authorize = require('./authorize')
const keychain = require('./keychain')
const log = require('./log')

module.exports = async function authenticate (client) {
  // grab username from keychain
  let username = await keychain.get('github:auth', 'username')

  if (!username) {
    // ask for username
    ({ username } = await inquirer.prompt({
      type: 'input',
      name: 'username',
      message: 'your Github username',
      // TODO: improve name validation
      validate: answer => answer.length > 0 || 'username cannot be empty'
    }))

    // securely store for later usage
    await keychain.set('github:auth', 'username', username)
  }

  // grab token from keychain
  let token = await keychain.get('github:tokens', username)

  if (!token) {
    log.info('starting Github Authentication dance ...')

    // grab password from keychain
    let password = await keychain.get('github:auth', 'password')

    if (!password) {
      // ask for password
      ({ password } = await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'your Github password',
        validate: answer => answer.length > 0 || 'password cannot be empty'
      }))

      // securely store for later usage
      await keychain.set('github:auth', 'password', password)
    }

    // set authentication mode to basic auth
    client.authenticate({ type: 'basic', username, password });

    // get personal token from github
    ({ data: { token } } = await authorize(client))

    // securely store for later usage
    await keychain.set('github:tokens', username, token)

    log.success('github successfully authenticated')
  }

  client.authenticate({ type: 'token', token })
}
