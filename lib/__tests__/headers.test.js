const headers = require('../headers')

jest.mock('../../package.json', () => ({ name: 'package-name', version: '1.2.3' }))

describe('headers', () => {
  it('gets default headers for github api calls',  () => {
    expect(headers).toEqual({
      'user-agent': 'package-name v1.2.3'
    })
  })
})
