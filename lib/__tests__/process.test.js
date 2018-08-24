const fs = require('fs')
const process = require('../process')
const repos = require('../repos')
const authenticate = require('../authenticate')

jest.mock('js-yaml', () => {
  return {
    safeLoad: jest.fn().mockReturnValue({
      id: 'id',
      repo: 'repo1',
      about: { title: 'title' }
    })
  }
})
jest.mock('@octokit/rest', () => {
  return jest.fn().mockImplementation(() => {
    return {
      repos: {
        getAll: jest.fn().mockReturnValueOnce( { data: ['a','b'] }),
        getContent: jest.fn().mockReturnValueOnce( { data: { content: 'ew0KaWQ6ICdpZCcsDQphYm91dDogeyB0aXRsZTogJ3RpdGxlJyB9DQp9' } } )
      },
      hasNextPage: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
      getNextPage: jest.fn().mockReturnValueOnce( { data: ['c','d'] })
    }
  })
})
jest.mock('../log', () => ( { info: jest.fn() } ))
jest.mock('../authenticate', () => jest.fn().mockResolvedValue( { data: { token: 'atoken' } } ))
jest.mock('../repos', () => jest.fn()
  .mockResolvedValue([
    { name: 'repo1', full_name: 'user/repo1', owner: { login: 'login1' } },
    { name: 'repo1', full_name: 'user/repo2', owner: { login: 'login2' } }
    ] ))
jest.mock('p-map', () => jest.fn()
  .mockImplementation((iterable, mapper, opts) => {
    return new Promise((resolve, reject) => {
      iterable.forEach((item) => {
        mapper(item)
      })
      resolve()
    })
  }))

global.console.table = jest.fn()

describe('process', () => {
  it('authenticates and fetches all repos', async () => {
    const mockArgv = {
      name: 'name',
      concurrency: 5,
      output: true
    }

    await process(mockArgv)
    expect(authenticate).toHaveBeenCalledWith(expect.objectContaining({
      getNextPage: expect.any(Function),
      hasNextPage: expect.any(Function),
      repos: { getAll: expect.any(Function), getContent: expect.any(Function) }
    }))
    expect(repos).toHaveBeenCalledWith(expect.objectContaining({
      getNextPage: expect.any(Function),
      hasNextPage: expect.any(Function),
      repos: { getAll: expect.any(Function), getContent: expect.any(Function) }
    }), mockArgv.name)
    expect(console.table).toHaveBeenCalledWith([{
      id: 'id',
      repo: 'repo1',
      title: 'title'
    }])
  })
})
