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
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.js'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  reporters: [
    'default',
    ['<rootDir>/index.js',
      { outPutPath: '/Users/harry.hou/Desktop/hazyzh/repoter/jest_report/dist',
        outPutName: 'hello_world.html',
      }
    ],
    // '<rootDir>/index.dev.js',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/*.{js,jsx}'
  ],
  testURL: 'http://localhost/'
}
