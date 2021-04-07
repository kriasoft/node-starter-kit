/**
 * Jest configuration.
 *
 * @see https://jestjs.io/docs/en/configuration
 * @type {import("@jest/types").Config.InitialOptions}
 *
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/.build/",
    "<rootDir>/.cache/",
    "<rootDir>/.github/",
    "<rootDir>/.vscode/",
    "<rootDir>/.yarn/",
    "<rootDir>/migrations/",
    "<rootDir>/scripts/",
  ],
};
