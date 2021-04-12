/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * CLI client for PostgreSQL. Usage example:
 *
 *   $ yarn psql
 *   # \dt
 *
 * @see https://www.postgresql.org/docs/current/app-psql.html
 */

const spawn = require("cross-spawn");
const createDatabase = require("./db-create");

// Load environment variables (PGHOST, PGUSER, etc.)
require("../env/config");

// Ensure that the target database exists
createDatabase().then(() => {
  // Launch interactive terminal for working with PostgreSQL
  spawn("psql", process.argv.slice(2), { stdio: "inherit" });
});
