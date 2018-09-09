// jest.config.js
module.exports = {
  verbose: true,
  globals: {
    'NODE_ENV': 'test'
  },
  moduleDirectories: [
    'node_modules',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  reporters: [
    // 'default',
    '<rootDir>/my-custom-reporter.js'
  ],
  testResultsProcessor: './my-custom-testResultsProcessor.js',
  collectCoverageFrom: [
    '<rootDir>/src/*.{js,jsx}'
  ]
}
