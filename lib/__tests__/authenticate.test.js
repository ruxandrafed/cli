const inquirer = require('inquirer')
const authenticate = require('../authenticate')
let authorize = require('../authorize')
const keychain = require('../keychain')

jest.mock('../authorize', () => jest.fn().mockResolvedValue( { data: { token: 'atoken' } } ))

describe('authenticate', () => {

  it('gets the username and token from keychain', async () => {
    const mockClient = {
      authenticate: jest.fn()
    }
    keychain.get = jest.fn()
      .mockResolvedValue('default')
      .mockResolvedValueOnce('ausername')
      .mockResolvedValueOnce('atoken')

    await authenticate(mockClient)
    expect(keychain.get).toHaveBeenCalledTimes(2)
    expect(keychain.get).toHaveBeenCalledWith('github:auth', 'username')
    expect(keychain.get).toHaveBeenCalledWith('github:tokens', 'ausername')
  })

  it('gets the username and password from keychain if token not found', async () => {
    const mockClient = {
      authenticate: jest.fn()
    }
    keychain.get = jest.fn()
      .mockResolvedValue('default')
      .mockResolvedValueOnce('ausername')
      .mockResolvedValueOnce(null) // no token
      .mockResolvedValueOnce('apassword')

    await authenticate(mockClient)
    expect(keychain.get).toHaveBeenCalledTimes(3)
    expect(keychain.get).toHaveBeenCalledWith('github:auth', 'username')
    expect(keychain.get).toHaveBeenCalledWith('github:tokens', 'ausername')
    expect(keychain.get).toHaveBeenCalledWith('github:auth', 'password')
  })

  it('prompts user for the username and password & sets info in keychain if not found', async () => {
    const mockClient = {
      authenticate: jest.fn()
    }
    keychain.get = jest.fn()
      .mockResolvedValue(null)
    keychain.set = jest.fn()
    inquirer.prompt = jest.fn()
      .mockResolvedValue({})
      .mockResolvedValueOnce({ username: 'ausername' })
      .mockResolvedValueOnce({ password: 'apassword' })
    authorize = jest.fn()

    await authenticate(mockClient)
    expect(inquirer.prompt).toHaveBeenCalled()
    expect(keychain.get).toHaveBeenCalledTimes(3)
    expect(keychain.get).toHaveBeenCalledWith('github:auth', 'username')
    expect(keychain.get).toHaveBeenCalledWith('github:tokens', 'ausername')
    expect(keychain.get).toHaveBeenCalledWith('github:auth', 'password')
    expect(keychain.set).toHaveBeenCalledWith('github:auth', 'username', 'ausername')
    expect(keychain.set).toHaveBeenCalledWith('github:tokens', 'ausername', 'atoken')
    expect(keychain.set).toHaveBeenCalledWith('github:auth', 'password', 'apassword')
  })

})
