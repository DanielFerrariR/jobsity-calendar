module.exports = {
  ...require('./spec/jest/config/jest_common'),
  coverageDirectory: 'jest_coverage',
  collectCoverageFrom: ['**/src/**/*.{js,jsx,ts,tsx}'],
  projects: ['./spec/jest/config/jest_client.js']
}
