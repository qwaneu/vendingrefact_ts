/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['jest-progress-bar-reporter'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
