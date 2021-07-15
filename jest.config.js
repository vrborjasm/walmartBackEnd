module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'json'],
  roots: ['test'],
  bail: 1,
  verbose: true,
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  coverageDirectory: './coverage',
}
