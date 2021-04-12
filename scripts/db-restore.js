/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Restores database from a backup file. Usage:
 *
 *   $ yarn db:restore [--from=#0]   # Uses APP_ENV=local by default
 *   $ APP_ENV=test db:restore       # Or, specify `dev`, `test`, or `prod`
 */

const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");
const minimist = require("minimist");
const { greenBright } = require("chalk");

// Load environment variables (PGHOST, PGUSER, etc.)
require("../env/config");

const { APP_ENV, PGDATABASE } = process.env;
const args = minimist(process.argv.slice(2));
const fromEnv = args.from || APP_ENV;

// Find the latest backup file for the selected environment
const file = fs
  .readdirSync(path.resolve(__dirname, "../.backup"))
  .sort()
  .reverse()
  .find((x) => x.endsWith(`_${fromEnv}.sql`));

if (!file) {
  console.log(`Cannot find a SQL backup file of the "${fromEnv}" environment.`);
  process.exit(1);
}

console.log(
  `Restoring ${greenBright(file)} to ${greenBright(PGDATABASE)} (${APP_ENV})...`
);

spawn(
  "psql",
  [
    "--file",
    path.resolve(__dirname, `../.backup/${file}`),
    "--echo-errors",
    "--no-readline",
    ...args._,
  ],
  { stdio: "inherit" }
).on("exit", process.exit);
