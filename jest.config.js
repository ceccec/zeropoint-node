module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 15000,
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    'setup.ts',
    'globalSetup.ts',
    'globalTeardown.ts',
    'global.d.ts',
    '.d.ts$'
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        types: ['jest', 'node']
      }
    }]
  },
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 20,
      functions: 35,
      lines: 40
    }
  },
}; 