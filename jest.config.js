const path = require('path')

module.exports = {
  rootDir: './',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  coveragePathIgnorePatterns: [
    '/commands/',
    '/node_modules/',
    '/coverage/',
    'jest.config.js',
    '/server/'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)']
}
