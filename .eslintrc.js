/**
 * ESLint configuration.
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
 *
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
  },

  extends: ["eslint:recommended", "prettier"],

  parserOptions: {
    ecmaVersion: 2020,
  },

  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      extends: ["plugin:@typescript-eslint/recommended"],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: ["*.test.js"],
      env: {
        jest: true,
      },
    },
    {
      files: ["rollup.config.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],

  ignorePatterns: [
    "/.build",
    "/.cache",
    "/.git",
    "/.husky",
    "/.yarn",
    "/**/__snapshots__",
    "/**/node_modules",
    "/coverage",
  ],
};
