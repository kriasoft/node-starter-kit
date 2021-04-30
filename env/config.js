/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */
//
// NOTE: 1) This file is only intended to be used for local development
//          and CI/CD workflows.
//       2) Doesn't use TypeScript for better interoperability with
//          automation scripts (faster execution).

const path = require("path");
const { config } = require("envars");

config();

const env = process.env;

if (!env.PGAPPNAME) {
  env.PGAPPNAME = `${env.APP_NAME}_${env.APP_ENV}`;
}

// Customize @babel/register cache location
const { version } = require("@babel/register/package.json");
const cachePath = `.cache/.babel.${version}.${env.NODE_ENV}.json`;
env.BABEL_CACHE_PATH = path.resolve(__dirname, "..", cachePath);
