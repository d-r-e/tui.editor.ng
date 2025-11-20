// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('../../jest.base.config');

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@plugin/(.*)$': '<rootDir>/src/$1',
    '^@toast-ui/editor$': '<rootDir>/../../apps/editor/src/index.ts',
    '^@/(.*)$': '<rootDir>/../../apps/editor/src/$1',
  },
};
