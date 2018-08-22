const tap = require('tap')

const validate = require('../lib/commands/test')

tap.test('valid yargs command', (assert) => {
  assert.plan(4)

  assert.type(validate.command, 'string')
  assert.type(validate.description, 'string')
  assert.type(validate.builder, 'function')
  assert.type(validate.handler, 'function')
})
