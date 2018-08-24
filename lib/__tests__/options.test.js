const options = require('../options')

describe('options', () => {
  it('returns object with options config', () => {
    expect(options.concurrency.type).toEqual('number')
    expect(options.output.describe).toEqual('save results to disk')
  })
})
