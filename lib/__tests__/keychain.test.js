const keytar = require('keytar')
const keychain = require('../keychain')

jest.mock('../../package.json', () => ({ name: 'package-name', version: '1.2.3' }))

describe('keychain', () => {
  it('gets keytar password',  () => {
    keytar.getPassword = jest.fn().mockReturnValue('password')
    const result = keychain.get('service', 'account')
    expect(result).toEqual('password')
    expect(keytar.getPassword).toHaveBeenCalledWith('package-name:service', 'account')
  })

  it('sets keytar password',  () => {
    keytar.setPassword = jest.fn().mockReturnValue(true)
    const result = keychain.set('service', 'account', 'password')
    expect(result).toEqual(true)
    expect(keytar.setPassword).toHaveBeenCalledWith('package-name:service', 'account', 'password')
  })
})
