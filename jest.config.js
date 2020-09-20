const commonIgnoreDirs = [
  '<rootDir>/node_modules/',
  '<rootDir>/build/',
  '<rootDir>/dist/',
];

module.exports = {
  projects: [
    {
      name: 'browser',
      displayName: 'browser',
      testEnvironment: 'jsdom',
      verbose: true,
      testMatch: [
        '**/src/web/**/?(*.)(spec|test).js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      moduleNameMapper: {
        '\\.(svg|md)$': '<rootDir>/src/mocks/file.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
      },
      modulePathIgnorePatterns: commonIgnoreDirs,
      testPathIgnorePatterns: commonIgnoreDirs,
      coveragePathIgnorePatterns: commonIgnoreDirs,
    },
    {
      name: 'server',
      displayName: 'server',
      testEnvironment: 'node',
      verbose: true,
      testMatch: [
        '**/src/api/**/?(*.)(spec|test).js',
        '**/src/config/**/?(*.)(spec|test).js',
        '**/src/common/**/?(*.)(spec|test).js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      moduleNameMapper: {
        '\\.(svg|md)$': '<rootDir>/src/mocks/file.js',
      },
      modulePathIgnorePatterns: commonIgnoreDirs,
      testPathIgnorePatterns: commonIgnoreDirs,
      coveragePathIgnorePatterns: commonIgnoreDirs,
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
