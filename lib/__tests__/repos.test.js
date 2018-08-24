const repos = require('../repos')

describe('repos', () => {
  it('fetches repos for a user', async () => {
    const mockClient = {
      repos: {
        getAll: jest.fn().mockReturnValueOnce( { data: ['a','b'] })
      },
      hasNextPage: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
      getNextPage: jest.fn().mockReturnValueOnce( { data: ['c','d'] })
    }
    const reposData = await repos(mockClient)
    expect(reposData).toEqual(['a', 'b', 'c', 'd'])
  })

  it('fetches repos for an org', async () => {
    const mockClient = {
      repos: {
        getForOrg: jest.fn().mockReturnValueOnce( { data: ['a-org','b-org'] })
      },
      hasNextPage: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
      getNextPage: jest.fn().mockReturnValueOnce( { data: ['c-org','d-org'] })
    }
    const reposData = await repos(mockClient, 'org')
    expect(reposData).toEqual(['a-org', 'b-org', 'c-org', 'd-org'])
  })
})
