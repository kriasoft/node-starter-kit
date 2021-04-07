/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import run from "@rollup/plugin-run";
import pkg from "./package.json";

const isWatch = process.env.ROLLUP_WATCH === "true";

/**
 * Rollup bundler configuration.
 *
 * @see https://rollupjs.org/
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: isWatch
    ? "./server.ts"
    : {
        auth: "./auth",
        api: "./api",
      },

  output: {
    dir: ".build",
    format: "cjs",
    sourcemap: true,
  },

  plugins: [
    nodeResolve({
      extensions: [".ts", ".mjs", ".js", ".json", ".node"],
      modulesOnly: true,
    }),
    commonjs(),
    json(),
    babel({
      extensions: [".ts", ".js", ".mjs"],
      babelHelpers: "bundled",
      include: ["auth/**", "env/**", "functions/**"],
    }),
    isWatch && run({ execArgv: ["-r", "source-map-support/register"] }),
  ],

  external: Object.keys(pkg.dependencies),

  onwarn(warning, warn) {
    // Supress warnings in 3rd party libraries
    if (warning.id.includes("node_modules")) return;
    warn(warning);
  },
};

export default config;
