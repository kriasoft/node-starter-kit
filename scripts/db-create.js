/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Bootstraps a new PostgreSQL database if it doesn't exist.
 *
 *   $ yarn db:create                # Uses APP_ENV=local by default
 *   $ APP_ENV=test db:create        # Or, specify `dev`, `test`, or `prod`
 */

const knex = require("knex");
const { greenBright } = require("chalk");

// Load environment variables (PGHOST, PGUSER, etc.)
require("../env/config");

const config = require("../db/config");
const { PGUSER, PGDATABASE } = process.env;
const schema = config.searchPath || "public";

module.exports = async function createDatabase() {
  /** @type {import("knex").Knex} */
  let db;

  try {
    db = knex(config);
    await db.select(db.raw("current_database()"));
  } catch (err) {
    if (err.code !== "3D000" /* database does not exist */) throw err;

    console.log(`Creating ${greenBright(PGDATABASE)} database.`);
    const database = "template1";
    db = knex({ ...config, connection: { ...config.connection, database } });

    // Attempt to create a new database
    await db.raw(`CREATE DATABASE ?? WITH OWNER ??`, [PGDATABASE, PGUSER]);

    // Attempt to create a new database schema
    await db.raw(`CREATE SCHEMA IF NOT EXISTS ?? AUTHORIZATION ??`, [
      schema,
      PGUSER,
    ]);
  } finally {
    await db?.destroy();
  }
};

if (!module.parent) module.exports();
