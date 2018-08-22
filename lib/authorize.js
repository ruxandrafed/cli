const inquirer = require('inquirer')

const headers = require('./headers')
const pkg = require('../package.json')

module.exports = async function authorize (client) {
  try {
    const options = {
      scopes: ['admin:org', 'repo'], // TODO change permissions
      note: pkg.name,
      note_url: pkg.homepage,
      headers
    }

    return await client.authorization.create(options)
  } catch (error) {
    if (error.code === 401 && error.message.match('two-factor authentication')) {
      // as the user for the two-factor authentication token
      const { otp } = await inquirer.prompt({
        type: 'input',
        name: 'otp',
        message: 'two-factor authentication OTP code',
        validate: (answer) => answer.length > 0 || 'code cannot be empty'
      })

      // set the two-factor code in the header for all subsequent calls
      headers['X-GitHub-OTP'] = otp

      // try again
      return authorize(client)
    }

    // authorization already exists for our application
    if (error.code === 422 && error.message.match('already_exists')) {
      // find old one
      const { data } = await client.authorization.getAll({ per_page: 100 })
      const auth = data.find(auth => auth.note === pkg.name)

      // delete it
      await client.authorization.delete({ id: auth.id })

      // try again
      return authorize(client)
    }

    // throw the error if all else fails
    throw error
  }
}
