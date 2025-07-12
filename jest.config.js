module.exports = {
  preset: 'ts-jest',
  testTimeout: 15000,
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
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 20,
      functions: 35,
      lines: 40
    }
  },
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/src/__tests__/**/*.test.ts',
        '!<rootDir>/src/__tests__/stimulus/**/*.test.ts',
        '!<rootDir>/src/__tests__/setup.ts',
        '!<rootDir>/src/__tests__/global.d.ts'
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: {
            types: ['jest', 'node']
          }
        }]
      },
      setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts']
    },
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/src/__tests__/stimulus/**/*.test.ts',
        '!<rootDir>/src/__tests__/setup.ts',
        '!<rootDir>/src/__tests__/global.d.ts'
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: {
            types: ['jest', 'node']
          }
        }]
      },
      setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts']
    }
  ]
}; 