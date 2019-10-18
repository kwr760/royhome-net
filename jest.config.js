module.exports = {
  projects: [
    {
      displayName: 'browser',
      testEnvironment: 'jsdom',
      verbose: true,
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': '<rootDir>/test/mocks/file.js',
        '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
      },
      testMatch: [
        '**/src/web/**/?(*.)(spec|test).js',
        '**/src/server/**/?(*.)(spec|test).js',
      ],
      modulePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/',
      ],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/',
      ],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/',
        'webpack.config.js',
        '.eslintrc.js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      verbose: true,
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': '<rootDir>/test/mocks/file.js',
        '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
      },
      testMatch: [
        '**/src/server/**/?(*.)(spec|test).js',
      ],
      modulePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/',
      ],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/',
      ],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/dist/',
        'webpack.config.js',
        '.eslintrc.js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    },
  ],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  reporters: [
    'default', [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Results',
        outputPath: './unit/test-results.html',
      },
    ],
  ],
  coverageReporters: [
    'html',
  ],
  clearMocks: true,
};