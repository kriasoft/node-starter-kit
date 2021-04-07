/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import dotenv from "dotenv";
import { bool, cleanEnv, num, str } from "envalid";
import minimist from "minimist";

// Allow to switch between environments by passing [--env #0]
// flag when launching the app locally.
const args = minimist(process.argv.slice(2));
const env = args.env || "local";

// Load environment variables from .env files when
// the app is running in development mode.
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: `./env/.env.${env}.override` });
  dotenv.config({ path: `./env/.env.${env}` });
  dotenv.config({ path: `./env/.env.override` });
  dotenv.config({ path: `./env/.env` });
}

const appName = process.env.APP_NAME?.replace(/^W/g, "");

/**
 * Environment variables such as database connection settings, secrets, etc.
 */
export default cleanEnv(process.env, {
  APP_NAME: str(),
  APP_ORIGIN: str(),
  APP_ENV: str({ choices: ["production", "test", "development", "local"] }),

  JWT_COOKIE: str({ default: "id", devDefault: `id_${appName}` }),
  JWT_SECRET: str(),
  JWT_EXPIRES: num({ default: 60 * 60 * 24 * 14 /* 2 weeks */ }),

  PGHOST: str(),
  PGPORT: num({ default: 5432 }),
  PGUSER: str(),
  PGPASSWORD: str(),
  PGDATABASE: str(),
  PGSSLMODE: str({ choices: ["disable", "verify-ca"], default: "disable" }),
  PGSSLCERT: str({ default: "" }),
  PGSSLKEY: str({ default: "" }),
  PGSSLROOTCERT: str({ default: "" }),
  PGSERVERNAME: str({ default: "" }),
  PGDEBUG: bool({ default: false }),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),

  FACEBOOK_APP_ID: str(),
  FACEBOOK_APP_SECRET: str(),

  EMAIL_FROM: str(),
  EMAIL_PASSWORD: str(),
});
