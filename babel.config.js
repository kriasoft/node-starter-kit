/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Babel configuration.
 *
 * @see https://babeljs.io/docs/en/options
 * @type {import("@babel/core").TransformOptions}
 */
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: 14 } }],
    ["@babel/preset-typescript", { allowDeclareFields: true }],
  ],

  plugins: ["@babel/plugin-proposal-class-properties"],
};
