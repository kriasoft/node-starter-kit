/**
 * Babel configuration.
 *
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 * @type {import("@babel/core")}
 */

module.exports = {
  presets: [["@babel/preset-typescript"]],
  plugins: ["@babel/plugin-proposal-class-properties"],
  ignore: [".build/**", ".vscode/**", ".yarn/**", "migrations/**"],
};
