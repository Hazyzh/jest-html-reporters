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
    'default',
    '<rootDir>/index.dev.js'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/*.{js,jsx}'
  ]
}
