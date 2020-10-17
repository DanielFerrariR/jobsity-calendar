const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '../../..'),
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'mdx', 'md'],
  testMatch: ['<rootDir>/spec/jest/**/*.(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '.+\\.(svg)$': 'jest-transform-stub',
    '^.+\\.(mdx)$': '@storybook/addon-docs/jest-transform-mdx',
    '^.+\\.(md)$': 'jest-raw-loader'
  },
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^spec(.*)$': '<rootDir>/spec$1',
    '^storybook(.*)$': '<rootDir>/storybook$1'
  },
  setupFiles: ['<rootDir>/spec/jest/config/set_env_vars.js'],
  setupFilesAfterEnv: ['<rootDir>/spec/jest/config/setup_env.js'],
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
