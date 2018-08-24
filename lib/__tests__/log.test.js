const chalk = require('chalk')
const log = require('../log')

jest.mock('chalk', () => ({
  blue: jest.fn().mockReturnValue(''),
  orange: jest.fn().mockReturnValue(''),
  green: jest.fn().mockReturnValue(''),
  red: jest.fn().mockReturnValue('')
}))

global.console = {
  info: jest.fn(),
  log: jest.fn(),
  error: jest.fn()
}

describe('log', () => {

  it('logs info level messages to the console',  () => {
    log.info('something')
    expect(chalk.blue).toHaveBeenCalledWith('ℹ')
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('something'))
  })

  it('logs warn level messages to the console',  () => {
    log.warn('something')
    expect(chalk.orange).toHaveBeenCalledWith('✖')
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('something'))
  })

  it('logs success level messages to the console',  () => {
    log.success('something')
    expect(chalk.orange).toHaveBeenCalledWith('✖')
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('something'))
  })

  it('logs failure level messages to the console',  () => {
    log.failure('something')
    expect(chalk.orange).toHaveBeenCalledWith('✖')
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('something'))
  })
})
