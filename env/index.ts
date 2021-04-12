/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { bool, cleanEnv, num, str } from "envalid";

/**
 * Environment variables required by the app.
 *
 * @see https://github.com/af/envalid
 */
export default cleanEnv(process.env, {
  APP_NAME: str(),
  APP_ORIGIN: str(),
  APP_ENV: str({ choices: ["local", "dev", "test", "prod"] }),

  // Session (ID) cookie settings
  JWT_SECRET: str(),
  JWT_EXPIRES: num({ default: 60 * 60 * 24 * 14 /* 2 weeks */ }),

  // Google OAuth 2.0 client
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),

  // Facebook App
  FACEBOOK_APP_ID: str(),
  FACEBOOK_APP_SECRET: str(),

  // GitHub App
  GITHUB_APP_ID: str(),
  GITHUB_APP_KEY: str(),
  GITHUB_CLIENT_ID: str(),
  GITHUB_CLIENT_SECRET: str(),

  // Database connection settings
  // https://www.postgresql.org/docs/current/libpq-envars.html
  PGHOST: str(),
  PGUSER: str(),
  PGPASSWORD: str(),
  PGDATABASE: str(),
  PGAPPNAME: str(),

  // SSL/TLS settings unless connecting to the database via a Cloud SQL Proxy
  ...(!process.env.PGHOST?.startsWith("/cloudsql/") && {
    PGPORT: num({ default: 5432 }),
    PGSSLMODE: str({ choices: ["disable", "verify-ca"], default: "disable" }),
    PGSSLCERT: str({ default: "" }),
    PGSSLKEY: str({ default: "" }),
    PGSSLROOTCERT: str({ default: "" }),
    PGSERVERNAME: str({ default: "" }),
    PGDEBUG: bool({ default: false }),
  }),

  EMAIL_FROM: str(),
  EMAIL_PASSWORD: str(),
});
