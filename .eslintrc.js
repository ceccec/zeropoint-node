module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off', // Allow console for metaphysical insights
    '@typescript-eslint/no-explicit-any': 'off', // Allow any for flexibility
    '@typescript-eslint/no-unused-vars': 'warn', // Warn instead of error
    '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types
  },
}; 