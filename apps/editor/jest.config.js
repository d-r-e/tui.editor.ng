// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('../../jest.base.config');

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@toast-ui/toastmark$': '<rootDir>/../../libs/toastmark/src/index.ts',
  },
  transform: {
    ...base.transform,
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
};
