module.exports = {
  projects: [
    {
      name: 'browser',
      displayName: 'browser',
      testEnvironment: 'jsdom',
      verbose: true,
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': '<rootDir>/src/mocks/file.js',
        '\\.(css)$': 'identity-obj-proxy',
      },
      testMatch: [
        '**/src/client/**/?(*.)(spec|test).js',
      ],
      modulePathIgnorePatterns: [
        '/node_modules/',
        '/build/coverage',
        '/build/unit',
        '/dist/',
      ],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/build/coverage',
        '/build/unit',
        '/dist/',
      ],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/build/coverage',
        '/build/unit',
        '/dist/',
        'webpack.config.babel.js',
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
        '\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$': '<rootDir>/src/mocks/file.js',
      },
      testMatch: [
        '**/src/server/**/?(*.)(spec|test).js',
        '**/src/config/**/?(*.)(spec|test).js',
        '**/src/util/**/?(*.)(spec|test).js',
      ],
      modulePathIgnorePatterns: [
        '/node_modules/',
        '/build/coverage',
        '/build/unit',
        '/dist/',
      ],
      testPathIgnorePatterns: [
        '/node_modules/',
        '/build/coverage',
        '/build/unit',
        '/dist/',
      ],
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/build/coverage',
        '/build/unit',
        '/dist/',
        'webpack.config.babel.js',
        '.eslintrc.js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
    },
  ],
  collectCoverage: true,
  coverageDirectory: './build/coverage',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  reporters: [
    'default', [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Results',
        outputPath: './build/unit/test-results.html',
      },
    ],
  ],
  coverageReporters: [
    'text', 'html',
  ],
  clearMocks: true,
};
