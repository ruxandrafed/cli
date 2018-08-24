const inquirer = require('inquirer')
const authorize = require('../authorize')
const headers = require('../headers')

jest.mock('../headers', () => ({ 'user-agent': 'some-user-agent' }))
jest.mock('../../package.json', () => ({ name: 'package-name', homepage: 'package-homepage' }))

describe('authorize', () => {

  it('authorizes user with github and gets token', async () => {
    const mockClient = {
      authorization: {
        create: jest.fn().mockResolvedValue({ data: { token: 'some-token' } })
      }
    }

    const { data: { token } } = await authorize(mockClient)

    expect(mockClient.authorization.create).toHaveBeenCalledWith({
      headers: {
        'user-agent': 'some-user-agent'
      },
      note: 'package-name',
      note_url: 'package-homepage',
      scopes: expect.any(Array)
    })
    expect(token).toEqual('some-token')
  })

  it('prompts user for 2FA code if on', async () => {
    const mockClient = {
      authorization: {
        create: jest.fn()
          .mockRejectedValueOnce({ code: 401, message: 'two-factor authentication'})
          .mockResolvedValueOnce({ data: { token: 'some-token' } })
      }
    }
    inquirer.prompt = jest.fn()
      .mockResolvedValue({})
      .mockResolvedValueOnce({ otp: 'otp' })

    const { data: { token } } = await authorize(mockClient)
    expect(inquirer.prompt).toHaveBeenCalled()
    expect(token).toEqual('some-token')
    expect(headers['X-GitHub-OTP']).toEqual('otp')
  })

  it('replaces old authorization with new one', async () => {
    const mockClient = {
      authorization: {
        create: jest.fn()
          .mockRejectedValueOnce({ code: 422, message: 'already_exists'})
          .mockResolvedValueOnce({ data: { token: 'some-token' } }),
        getAll: jest.fn()
          .mockResolvedValueOnce({ data: [ { note: 'package-name' } ] }),
        delete: jest.fn()
      }
    }

    const { data: { token } } = await authorize(mockClient)
    expect(mockClient.authorization.getAll).toHaveBeenCalled()
    expect(mockClient.authorization.delete).toHaveBeenCalled()
    expect(token).toEqual('some-token')
  })

  it('throw errors if an unrecognized error is thrown', async () => {
    const mockClient = {
      authorization: {
        create: jest.fn()
          .mockRejectedValueOnce({ code: 500, message: 'server error'})
      }
    }

    expect(authorize(mockClient)).rejects.toEqual({ code: 500, message: 'server error'})
  })
})
