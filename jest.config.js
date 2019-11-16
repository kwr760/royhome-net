module.exports = {
  projects: [
    {
      name: 'browser',
      displayName: 'browser',
      testEnvironment: 'jsdom',
      verbose: true,
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': '<rootDir>/test/mocks/file.js',
        '\\.(css)$': 'identity-obj-proxy',
      },
      testMatch: [
        '**/src/web/**/?(*.)(spec|test).js',
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
        '^.+\\.html$': 'html-loader-jest',
      },
    },
    {
      name: 'server',
      displayName: 'server',
      testEnvironment: 'node',
      verbose: true,
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': '<rootDir>/test/mocks/file.js',
      },
      testMatch: [
        '**/src/server/**/?(*.)(spec|test).js',
        '**/src/config/**/?(*.)(spec|test).js',
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
      statements: 90,
      branches: 90,
      lines: 90,
      functions: 90,
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
    'text', 'html',
  ],
  clearMocks: true,
};
