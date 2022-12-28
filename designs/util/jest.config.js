const jestConfig = require('../../jest.config');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

jestConfig.moduleNameMapper = {
  ...jestConfig.moduleNameMapper,
  ...pathsToModuleNameMapper(compilerOptions.paths ?? {}, { prefix: '<rootDir>/' }),
};
module.exports = jestConfig;
