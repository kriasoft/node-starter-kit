# Node.js Starter Kit

<a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/GrqQaSnvmr"><img src="https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square" height="20"></a>
<a href="https://github.com/kriasoft/node-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/node-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

Node.js Starter Kit is a project template for building Node.js applications
optimized for serverless infrastructure such as [Google Cloud Functions](https://cloud.google.com/functions),
[AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://azure.microsoft.com/services/functions/), etc.

## Features

- Database first design; auto-generated strongly typed data models (TypeScript)
- Authentication and authorization using OAuth 2.0 providers (Google, Facebook, GitHub, etc.)
- Stateless sessions implemented with JWT tokens and a session cookie (compatible with SSR)
- Database schema migration, seeds, and REPL shell tooling
- Pre-configured unit testing tooling powered by [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest)
- Multiple cloud functions within the same project (`auth`, `api`, `img`, etc.)
- Application bundling with Rollup as an optimization technique for serverless deployments
- Rebuilds and restarts the app on changes when running locally
- Pre-configured for `local`, `dev`, `test`, and `prod` environments

---

This project was bootstrapped with [Node.js Starter Kit](https://github.com/kriasoft/node-starter-kit).
Be sure to join our [Discord channel](https://discord.com/invite/GrqQaSnvmr) for assistance.

## Tech Stack

- [Node.js](https://nodejs.org/) v14, [Yarn](https://yarnpkg.com/) package manager, [TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/), [Rollup](https://rollupjs.org/)
- [PostgreSQL](https://www.postgresql.org/), [Knex](https://knesjs.org/),
  [Express](https://expressjs.com/), [Handlebars](https://handlebarsjs.com/),
  [Simple OAuth2](https://github.com/lelylan/simple-oauth2).

## Directory Structure

`├──`[`.build`](.build) — Compiled and bundled output (per Cloud Function)<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`api`](./api) — Cloud Function for handling API requests<br>
`├──`[`auth`](./auth) — Cloud Function for handling authentication<br>
`├──`[`db`](./db) — Database client for PostgreSQL using [Knex](https://knexjs.org/)<br>
`├──`[`emails`](./emails) — Email templates (Handlebars)<br>
`├──`[`env`](./env) — Environment variables for `local`, `dev`, `test`, and `prod`<br>
`├──`[`migrations`](./migrations) — database schema migrations ([Cloud SQL](https://cloud.google.com/sql), [Knex](https://knexjs.org/))<br>
`├──`[`scripts`](./scripts) — Deployment scripts, REPL shell, etc.<br>
`├──`[`test`](./test) — Unit tests and benchmarks<br>
`├──`[`views`](./views) — HTML templates (Handlebars)<br>
`└── ...` — add more cloud functions such as `worker`, `notifications`, etc.

## Requirements

- [Node.js](https://nodejs.org/) v14, [Yarn](https://yarnpkg.com/) package manager
- Local or remote instance of [PostgreSQL](https://www.postgresql.org/) (see [Postgres.app](https://postgresapp.com/), [Google Cloud SQL](https://cloud.google.com/sql))
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)

## Getting Started

- Clone the repo — `git clone -o seed https://github.com/kriasoft/node-starter-kit.git`.
- Update environment variables for `local`, `dev`, `test`, and `prod` environments ([`./env`](./env)).
- Install project dependencies — `yarn install`
- Bootstrap PostgreSQL database — `yarn db:create`
- Finally, launch the app — `yarn start`, it will become available at [http://localhost:8080](http://localhost:8080/).

Use `APP_ENV` environment variable to execute scripts for different environments, for example:

```
$ APP_ENV=test yarn db:migrate
$ APP_ENV=test yarn start
```

![](https://files.tarkus.me/node-starter-kit-start.svg)

**IMPORTANT**: Ensure that VSCode is using the workspace versions of TypeScript and ESLint.

![](https://files.tarkus.me/typescript-workspace.png)

## Scripts

- `yarn start` — Launches the app in development mode on [`http://localhost:8080`](http://localhost:8080/)
- `yarn build` — Compiles and bundles the app for deployment
- `yarn lint` — Validate code using ESLint
- `yarn tsc` — Validate code using TypeScript compiler
- `yarn test` — Run unit tests with Jest, Supertest
- `yarn repl` — Connect to the database using Knex REPL shell
- `yarn psql` — Connect to the database using PostgreSQL CLI
- `yarn db:create` — Create a new database
- `yarn db:version` — Check the current version of the database
- `yarn db:migrate` — Migrate database schema to the latest version
- `yarn db:rollback` — Rollback the latest migration
- `yarn db:seed` — Seed database with sample / reference data
- `yarn db:reset` — Re-apply the latest DB schema migration file
- `yarn update-types` — Generate strongly typed data models from database schema

Optionally set `APP_ENV` to `local` (default), `dev`, `test`, or `prod` before running these scripts.

![](https://files.tarkus.me/node-starter-kit-db.svg)

## Related Projects

- [GraphQL API Starter Kit](https://github.com/kriasoft/graphql-starter) — project template, pre-configured with TypeScript, GraphQL.js, React, and Relay.
- [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — project template, pre-configured with Webpack and React

## How to Contribute

Anyone and everyone is welcome to [contribute](.github/CONTRIBUTING.md). Start
by checking out the list of [open issues](https://github.com/kriasoft/node-starter-kit/issues)
marked [help wanted](https://github.com/kriasoft/node-starter-kit/issues?q=label:"help+wanted").
However, if you decide to get involved, please take a moment to review the
[guidelines](.github/CONTRIBUTING.md).

## License

Copyright © 2016-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/node-starter-kit/blob/main/LICENSE) file.

---

<sup>Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@koistya))
and [contributors](https://github.com/kriasoft/node-starter-kit/graphs/contributors).</sup>
