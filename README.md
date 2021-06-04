# Node.js API Starter Kit

<a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/GrqQaSnvmr"><img src="https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square" height="20"></a>
<a href="https://github.com/kriasoft/node-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/node-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

Node.js API Starter Kit is a project template for building Node.js backend applications
optimized for serverless infrastructure such as [Google Cloud Functions](https://cloud.google.com/functions),
[AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://azure.microsoft.com/services/functions/), etc.
Use it as an API server for your front-end app.

## Features

- Database first design; auto-generated strongly typed data models (TypeScript)
- Authentication and authorization using OAuth 2.0 providers (Google, Facebook, GitHub, etc.)
- Stateless sessions implemented with JWT tokens and a session cookie (compatible with SSR)
- GraphQL API example, implemented using the code-first development approach
- Database schema migration, seeds, and REPL shell tooling
- Transactional emails using Handlebars templates and instant email previews
- Structured logs and error reporting to Google StackDriver
- Pre-configured unit testing tooling powered by [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest)
- Application bundling with Rollup as an optimization technique for serverless deployments
- Rebuilds and restarts the app on changes when running locally
- Pre-configured for `local`, `dev`, `test`, and `prod` environments
- The ongoing design and development is supported by these wonderful companies:

<a href="https://reactstarter.com/s/1"><img src="https://reactstarter.com/s/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/2"><img src="https://reactstarter.com/s/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/s/3"><img src="https://reactstarter.com/s/3.png" height="60" /></a>

![](https://files.tarkus.me/graphql-api.png)

---

This project was bootstrapped with [Node.js API Starter Kit](https://github.com/kriasoft/node-starter-kit).
Be sure to join our [Discord channel](https://discord.com/invite/GrqQaSnvmr) for assistance.

## Tech Stack

- [Node.js](https://nodejs.org/) v14, [Yarn](https://yarnpkg.com/) package manager,
  [TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/),
  [Rollup](https://rollupjs.org/), [ESLint](https://eslint.org/),
  [Prettier](https://prettier.io/), [Jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/), [GraphQL.js](https://github.com/graphql/graphql-js),
  [Knex](https://knesjs.org/), [Express](https://expressjs.com/),
  [Nodemailer](https://nodemailer.com/),[Email Templates](https://email-templates.js.org/),
  [Handlebars](https://handlebarsjs.com/), [Simple OAuth2](https://github.com/lelylan/simple-oauth2)

## Directory Structure

`├──`[`.build`](.build) — Compiled and bundled output (per Cloud Function)<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`api`](./api) — Cloud Function for handling API requests using [GraphQL.js](https://github.com/graphql/graphql-js)<br>
`├──`[`auth`](./auth) — Authentication and session middleware<br>
`├──`[`core`](./core) — Common application modules (email, logging, etc.)<br>
`├──`[`db`](./db) — Database client for PostgreSQL using [Knex](https://knexjs.org/)<br>
`├──`[`emails`](./emails) — Email templates for transactional emails using [Handlebars](https://handlebarsjs.com/)<br>
`├──`[`env`](./env) — Environment variables for `local`, `dev`, `test`, and `prod`<br>
`├──`[`migrations`](./migrations) — database schema migrations ([Cloud SQL](https://cloud.google.com/sql), [Knex](https://knexjs.org/))<br>
`├──`[`scripts`](./scripts) — Deployment scripts, REPL shell, etc.<br>
`├──`[`test`](./test) — Unit tests and benchmarks<br>
`├──`[`views`](./views) — HTML templates using [Handlebars](https://handlebarsjs.com/)<br>
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

## How to Configure 0Auth 2.0 Login Flow

For each 3rd party identity provider that needs to be enabled for your app, you
will need to obtain application credentials, often called client ID/secret.

### Google

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- [Create a new GCP project](https://console.cloud.google.com/projectcreate)
- [Configure OAuth concent screen](https://console.cloud.google.com/apis/credentials/consent)
- [Create OAuth 2.0 client](https://console.cloud.google.com/apis/credentials/oauthclient)
  with `http://localhost/auth/google/return` as the callback URL
- Update `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` environment variables
  found in [`./env/.env.*`](./env/) for each environment that you need.

From there on, visiting [`http://localhost:8080/auth/google`](http://localhost:8080/auth/google)
(or, opening it in a popup window) would initiate login flow via Google.

### Facebook

- Go to [Facebook Developer](https://developers.facebook.com/apps/) website
- Create a new Facebook App, enable Facebook Login for this app
- Close Quickstart dialog and go straight to the app settings
- Add `http://localhost/auth/facebook/return` as the callback URL for the login flow
- Copy and paste the newly created Facebook App ID and secret to
  `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET` variables found in [`env/.env.*`](./env/)
  files for each environment that you need.

From there on, visiting [`http://localhost:8080/auth/facebook`](http://localhost:8080/auth/facebook)
(or, opening it in a popup window) would initiate login flow via Facebook.

## How to Deploy

The deployment script (`yarn deploy`) relies on Google Cloud CLI (`gcloud`) tool
that you can download from [here](https://cloud.google.com/sdk/docs/install). For
CI/CD workflows you may need a Docker image like [this one](https://github.com/marketplace/actions/google-cloud-platform-gcp-cli-gcloud).

`gcloud auth login` — Authorize Google Cloud SDK (CLI) tool to use your Google account.

[Create](https://console.cloud.google.com/projectcreate) a new GCP project for
your app with IDs such as `example` for production, and `example-test` for test
/ QA environments. Ensure that Cloud Build API and Cloud Functions API are
enabled in your GCP project's settings [here](https://console.cloud.google.com/apis/library).

Create a Cloud SQL database instance [here](https://console.cloud.google.com/sql)
in the same region where your app needs to be deployed. Using a micro instance
of Cloud SQL with 0.6 GB RAM should be OK for testing and low traffic websites.

Ensure that `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_REGION`, `PGDATABASE`, `PGUSER`
and the other environment variables are correctly set for the target deployment
environment (e.g. [`/env/.env`](./env/.env) + [`/env/.env.prod`](./env/.env.prod)
for production).

Finally, compile and deploy the app by running:

- `yarn build` — Compiles the app into the `.build` folder
- `APP_ENV=<env> yarn db:migrate` — Migrates database (schema) to the latest version
- `APP_ENV=<env> yarn deploy` — Deploys the app to Google Cloud Functions (GCF)

Where `<env>` is the target environment, e.g. `APP_ENV=prod yarn deploy`.

## How to Update

- `yarn set version latest` — Bump Yarn to the latest version
- `yarn upgrade-interactive` — Update Node.js modules (dependencies)
- `yarn pnpify --sdk vscode` — Update TypeScript, ESLint, and Prettier settings in VSCode

## Backers

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## Related Projects

- [GraphQL API Starter Kit](https://github.com/kriasoft/graphql-starter) — monorepo template, pre-configured with TypeScript, GraphQL, React, and Relay.
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
