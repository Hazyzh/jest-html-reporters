// jest.config.js
module.exports = {
  verbose: true,
  globals: {
    'NODE_ENV': 'test'
  },
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    'assets/images/.+?\\.svg$': '<rootDir>/test/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '^@\/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  reporters: [
    'default',
    ['<rootDir>/index.js', {
      'publicPath': './html-report',
      'filename': 'report.html',
    }]
    // '<rootDir>/index.dev.js',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/*.{js,jsx}'
  ],
  testURL: 'http://localhost/',
  setupFiles: [
    '<rootDir>/test/setup.js'
  ],
  setupFilesAfterEnv: ['jest-enzyme']
}
