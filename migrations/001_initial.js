/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * The initial database schema (migration).
 *
 * @see https://knexjs.org/#Schema
 * @typedef {import("knex").Knex} Knex
 * @param {Knex} db
 */
module.exports.up = async function up(db) {
  // OAuth identity providers
  const idps = [
    "google",     // Google (google.com)
    "apple",      // Apple (apple.com)
    "facebook",   // Facebook (facebook.com)
    "github",     // GitHub (github.com)
    "linkedin",   // LinkedIn (linkedin.com)
    "microsoft",  // Microsoft (microsoft.com)
    "twitter",    // Twitter (twitter.com)
    "yahoo",      // Yahoo (yahoo.com)
    "gamecenter", // Apple Game Center (gc.apple.com)
    "playgames",  // Google Play Games (playgames.google.com)
  ]; /* prettier-ignore */

  // PostgreSQL extensions
  // https://cloud.google.com/sql/docs/postgres/extensions
  await db.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.raw(`CREATE EXTENSION IF NOT EXISTS "hstore"`);
  await db.raw(`CREATE EXTENSION IF NOT EXISTS "citext"`);

  // Custom data types (username, email, custom IDs, enums, etc.)
  await db.raw(`CREATE DOMAIN short_id AS text CHECK(VALUE ~ '^[0-9a-z]{4,8}$')`); // prettier-ignore
  await db.raw(`CREATE DOMAIN username AS citext CHECK (VALUE ~ '^[0-9a-zA-Z._]{2,30}$')`); // prettier-ignore
  await db.raw(`CREATE DOMAIN email AS citext CHECK (VALUE ~ '^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$')`); // prettier-ignore
  await db.raw(`CREATE TYPE identity_provider AS ENUM (${idps.map(x => `'${x}'`).join(', ')})`); // prettier-ignore

  await db.schema.createTable("user", (table) => {
    table.specificType("id", "short_id").notNullable().primary();
    table.specificType("username", "username").unique();
    table.specificType("email", "email").index();
    table.boolean("email_verified").notNullable().defaultTo(false);
    table.string("password", 60); // 60-character bcrypt hash string
    table.string("name", 100);
    table.jsonb("picture").notNullable().defaultTo({}); // E.g. { filename: "/user/123.jpg", width: 60, height: 60 }
    table.string("time_zone", 50);
    table.string("locale", 10);
    table.boolean("admin").notNullable().defaultTo(false);
    table.timestamp("last_login");
    table.timestamps(false, true);
    table.timestamp("deleted_at");
  });

  await db.schema.createTable("identity", (table) => {
    // User identifier provided by a 3rd party identity provider
    table.string("id", 36).notNullable();
    table.specificType("provider", "identity_provider").notNullable();
    table
      .specificType("user_id", "short_id")
      .notNullable()
      .references("user.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .index();
    table.specificType("username", "citext").index();
    table.specificType("email", "citext").index();
    // Access, refresh tokens, scope, and expiration date(s)
    table.jsonb("credentials").notNullable().defaultTo({});
    table.timestamps(false, true);
    table.primary(["provider", "id"]);
  });
};

/**
 * Rollback function for the migration.
 *
 * @param {Knex} db
 */
module.exports.down = async function down(db) {
  await db.schema.dropTableIfExists("identity");
  await db.schema.dropTableIfExists("user");

  await db.raw("DROP DOMAIN IF EXISTS short_id");
  await db.raw("DROP DOMAIN IF EXISTS username");
  await db.raw("DROP DOMAIN IF EXISTS email");
  await db.raw("DROP TYPE IF EXISTS identity_provider");
};

module.exports.configuration = { transaction: true };
