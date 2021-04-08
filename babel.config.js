/**
 * Babel configuration.
 *
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 * @type {import("@babel/core")}
 */

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "14" } }],
    ["@babel/preset-typescript", { allowDeclareFields: true }],
  ],

  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
  ],

  ignore: [".build/**", ".vscode/**", ".yarn/**", "migrations/**"],
};
