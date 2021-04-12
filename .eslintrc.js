/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * ESLint configuration.
 *
 * @see https://eslint.org/docs/user-guide/configuring
 * @type {import("eslint").Linter.Config}
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
      files: ["*.ts", ".tsx"],
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
    {
      files: ["db/types.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
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
