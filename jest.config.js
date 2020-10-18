const commonIgnoreDirs = [
  '<rootDir>/node_modules/',
  '<rootDir>/build/',
  '<rootDir>/reports/',
  '<rootDir>/dist/',
];

module.exports = {
  preset: 'ts-jest',
  projects: [
    {
      name: 'browser',
      displayName: 'browser',
      testEnvironment: 'jsdom',
      verbose: true,
      testMatch: [
        '**/src/web/**/?(*.)spec.ts?(x)',
      ],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      moduleNameMapper: {
        '\\.(svg|md)$': '<rootDir>/src/mocks/file.ts',
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
        '**/src/api/**/?(*.)spec.ts',
        '**/src/config/**/?(*.)spec.ts',
        '**/src/common/**/?(*.)spec.ts',
      ],
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      moduleNameMapper: {
        '\\.(svg|md)$': '<rootDir>/src/mocks/file.ts',
      },
      modulePathIgnorePatterns: commonIgnoreDirs,
      testPathIgnorePatterns: commonIgnoreDirs,
      coveragePathIgnorePatterns: commonIgnoreDirs,
    },
  ],
  collectCoverage: true,
  coverageDirectory: './reports/coverage',
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
        outputPath: './reports/unit-results.html',
      },
    ],
  ],
  coverageReporters: [
    'text', 'html',
  ],
  clearMocks: true,
};
