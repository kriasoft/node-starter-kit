/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import run from "@rollup/plugin-run";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import "./env/config";
import pkg from "./package.json";

// AKA, development mode
const isWatch = process.env.ROLLUP_WATCH === "true";

/**
 * Rollup bundler configuration.
 *
 * @see https://rollupjs.org/
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: "./api/index.ts",

  output: {
    dir: ".build",
    format: "cjs",
    sourcemap: true,
    chunkFileNames: "[name].chunk.js",
  },

  plugins: [
    del({ targets: ".build/*" }),

    copy({
      targets: [
        {
          src: "views/**",
          dest: ".build/views",
        },
        {
          src: "package.json",
          dest: ".build",
          copyOnce: true,
          transform(content) {
            const pkg = JSON.parse(content);
            delete pkg.scripts;
            delete pkg.devDependencies;
            delete pkg.envars;
            return JSON.stringify(pkg, null, "  ");
          },
        },
        {
          src: [".pnp.js", ".yarnrc.yml", "yarn.lock"],
          dest: ".build",
          copyOnce: true,
        },
        {
          src: [".yarn/releases", ".yarn/plugins"],
          dest: ".build/.yarn",
          copyOnce: true,
        },
      ],
    }),

    nodeResolve({
      extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".node"],
    }),

    commonjs(),

    json(),

    babel({
      extensions: [".ts", ".tsx", ".js", ".mjs"],
      babelHelpers: "bundled",
    }),

    !isWatch &&
      replace({
        "process.env.NODE_ENV": `"production"`,
        preventAssignment: true,
      }),

    isWatch &&
      run({
        execArgv: ["-r", "./.pnp.js", "-r", "source-map-support/register"],
      }),
  ],

  external: Object.keys(pkg.dependencies),

  // Suppress warnings in 3rd party libraries
  onwarn(warning, warn) {
    if (warning.id?.includes("node_modules")) return;
    warn(warning);
  },
};

export default config;
