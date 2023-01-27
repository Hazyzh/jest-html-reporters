// jest.config.js
module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  globals: {
    NODE_ENV: 'test',
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    'assets/images/.+?\\.svg$': '<rootDir>/test/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ogg)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  reporters: [
    'default',
    [
      '<rootDir>/index.js',
      {
        publicPath: './html-report',
        filename: 'report.html',
        enableMergeData: true,
        dataMergeLevel: 2,
        // openReport: true,
        // inlineSource: true,
      },
    ],
    // '<rootDir>/index.dev.js',
  ],
  collectCoverageFrom: ['<rootDir>/src/*.{js,jsx}'],
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  globalSetup: '<rootDir>/test/globalSetup.js',
  transformIgnorePatterns: [
    "node_modules/(recharts)",
    "jest-runner"
  ]
};
