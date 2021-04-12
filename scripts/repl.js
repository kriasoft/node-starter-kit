/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * REPL shell that can be used for working with Knex.js from
 * the terminal window. For example:
 *
 *   $ yarn repl
 *   > await db.table("user").first();
 *
 * @see https://knexjs.org/
 */

const repl = require("repl");
const { greenBright, blueBright } = require("chalk");
const createDatabase = require("./db-create");

// Load environment variables (PGHOST, PGUSER, etc.)
require("../env/config");
// Allow to import TypeScript files compiled on the fly via Babel
require("@babel/register")({ extensions: [".ts", ".js"] });

// Starts a REPL shell
Promise.resolve()
  .then(() => createDatabase())
  .then(async function () {
    const db = (global.db = require("../db").default);
    return db.select(db.raw("version(), current_database() as database"));
  })
  .then(([x]) => {
    console.log(x.version);
    console.log(`Connected to ${greenBright(x.database)}. Usage example:`);
    console.log(``);
    console.log(`   await db.table("user").first()`);
    console.log(`   await db.select(db.raw("version()"))`);
    console.log(`   await db.fn.newUserId()`);
    console.log(``);
    console.log(`Type ${greenBright(".exit")} to exit the REPL shell`);
    repl.start(blueBright(`#> `)).on("exit", () => global.db?.destroy());
  });
