module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 15000,
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 20,
      functions: 35,
      lines: 40
    }
  },
}; 