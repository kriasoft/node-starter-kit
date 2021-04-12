/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

const path = require("path");

/**
 * Jest configuration.
 *
 * @see https://jestjs.io/docs/en/configuration
 * @type {import("@jest/types").Config.InitialOptions}
 */
module.exports = {
  cacheDirectory: path.resolve(__dirname, ".cache/jest"),
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/.build/",
    "<rootDir>/.cache/",
    "<rootDir>/.github/",
    "<rootDir>/.husky/",
    "<rootDir>/.vscode/",
    "<rootDir>/.yarn/",
    "<rootDir>/migrations/",
    "<rootDir>/scripts/",
  ],
  globalSetup: "<rootDir>/test/setup.ts",
  globalTeardown: "<rootDir>/test/teardown.ts",
};
