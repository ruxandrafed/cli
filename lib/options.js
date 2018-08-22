module.exports = {
  concurrency: {
    type: 'number',
    describe: 'concurrent clone operations',
    default: 10
  },

  output: {
    type: 'string',
    describe: 'save results to disk',
    default: 'results'
  }
}
