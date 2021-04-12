/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import chalk from "chalk";
import express from "express";
import { NotFound } from "http-errors";
import { auth } from "../auth";
import { handleError } from "./errors";
import { withViews } from "./views";

export const api = withViews(express());

// OAuth 2.0 authentication endpoints and user sessions
api.use(auth);

api.get("/", (req, res) => {
  res.render("home");
});

api.get("/api/", function (req, res) {
  res.send(`Hello from API!`);
});

api.get("/favicon.ico", function (req, res) {
  res.redirect("https://nodejs.org/static/images/favicons/favicon.ico");
});

api.get("*", function () {
  throw new NotFound();
});

api.use(handleError);

/**
 * Launch API for testing when in development mode.
 *
 * NOTE: This block will be removed in production build by Rollup.
 */
if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT ?? 8080;
  const envName = chalk.greenBright(process.env.APP_ENV);
  const dbName = chalk.greenBright(process.env.PGDATABASE);
  const url = chalk.blueBright(`http://localhost:${port}/`);

  const server = api.listen(port, function () {
    console.log(`Listening on ${url} (env: ${envName}, db: ${dbName})`);
  });

  process.once("SIGTERM", function () {
    server.close();
  });
}
