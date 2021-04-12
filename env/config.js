/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */
//
// NOTE: 1) This file is only intended to be used for local development
//          and CI/CD workflows.
//       2) Doesn't use TypeScript for better interoperability with
//          automation scripts (faster execution).

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Fallback to "local" environment when omitted
const env = process.env;
env.APP_ENV = env.APP_ENV ?? "local";
env.NODE_ENV = env.NODE_ENV ?? "development";

// Customize the list of supported environments as needed
if (!["local", "dev", "test", "prod"].includes(env.APP_ENV)) {
  throw new Error(`APP_ENV=${env.APP_ENV} not supported.`);
}

// Load environment variable for the selected environment.
// This is mostly useful in development mode, when running
// the app locally. Usage example: `APP_ENV=dev yarn start`
dotenv.config({ path: `./env/.env.${env.APP_ENV}.override` });
dotenv.config({ path: `./env/.env.${env.APP_ENV}` });
dotenv.config({ path: `./env/.env.override` });
dotenv.config({ path: `./env/.env` });

if (!env.PGAPPNAME) {
  env.PGAPPNAME = `${env.APP_NAME}_${env.APP_ENV}`;
}

// Ensure that the SSL key file has correct permissions
if (env.PGSSLKEY) {
  try {
    fs.chmodSync(env.PGSSLKEY, 0o600);
  } catch (err) {
    console.error(err);
  }
}

// Customize @babel/register cache location
const { version } = require("@babel/register/package.json");
const cachePath = `.cache/.babel.${version}.${env.NODE_ENV}.json`;
env.BABEL_CACHE_PATH = path.resolve(__dirname, "..", cachePath);
