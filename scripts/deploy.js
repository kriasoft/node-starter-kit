/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

const spawn = require("cross-spawn");
const args = require("minimist")(process.argv.slice(2));

process.env.NODE_ENV = "production";
process.env.APP_ENV = args.env ?? process.env.APP_ENV ?? "test";

// Load environment variables (PGHOST, PGUSER, etc.)
require("../env/config");
// Allow to import TypeScript files compiled on the fly via Babel
require("@babel/register")({ extensions: [".ts", ".js"] });

const NAME = "api"; // Cloud Function name
const APP_ENV = process.env.APP_ENV; // Deployment environment
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const REGION = process.env.GOOGLE_CLOUD_REGION;
const PGSERVERNAME = process.env.PGSERVERNAME;

// Use Cloud SQL Proxy in Google Cloud Functions (GCF) environment
process.env.PGHOST = `/cloudsql/${PGSERVERNAME.replace(":", `:${REGION}:`)}`;
process.env.PGAPPNAME = `${NAME}_${APP_ENV}_${new Date().toISOString()}`;

// Load the list of environment variables required by the app
const env = require("../env").default;

spawn(
  "gcloud",
  [
    `--project=${PROJECT_ID}`,
    `functions`,
    `deploy`,
    NAME,
    `--region=${REGION}`,
    `--allow-unauthenticated`,
    `--entry-point=api`,
    `--memory=1GB`,
    `--runtime=nodejs14`,
    `--source=./.build`,
    `--timeout=30`,
    `--trigger-http`,
    `--set-env-vars=NODE_OPTIONS=-r ./.pnp.js -r source-map-support/register`,
    ...Object.keys(env).map((key) => `--set-env-vars=${key}=${env[key]}`),
  ],
  { stdio: "inherit" }
).on("error", (err) => {
  console.error(err);
  process.exit(1);
});
