# Node.js Starter Kit

<a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
<a href="http://patreon.com/koistya"><img src="https://img.shields.io/badge/dynamic/json?color=%23ff424d&label=Patreon&style=flat-square&query=data.attributes.patron_count&suffix=%20patrons&url=https%3A%2F%2Fwww.patreon.com%2Fapi%2Fcampaigns%2F233228" height="20"></a>
<a href="https://discord.gg/gx5pdvZ7Za"><img src="https://img.shields.io/discord/643523529131950086?label=Chat&style=flat-square" height="20"></a>
<a href="https://github.com/kriasoft/node-starter-kit/stargazers"><img src="https://img.shields.io/github/stars/kriasoft/node-starter-kit.svg?style=social&label=Star&maxAge=3600" height="20"></a>
<a href="https://twitter.com/koistya"><img src="https://img.shields.io/twitter/follow/koistya.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

Node.js Starter Kit is a project template for building Node.js
applications optimized for serverless infrastructure such as
[Google Cloud Functions](https://cloud.google.com/functions),
[AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://azure.microsoft.com/services/functions/), etc.

## Features

- Pre-configured for `local`, `dev`, `test`, and `prod` environments
- Authentication and authorization using OAuth 2.0 providers (Google, Facebook, etc.)
- Stateless sessions implemented with JWT tokens and a session cookie
- Strongly typed data model using [TypeORM](https://typeorm.io/) and DB schema migrations
- Multiple cloud functions within the same project (`auth`, `api`, `img`, etc.)
- Rebuilds and restarts the app on changes when running locally

---

This project was bootstrapped with [Node.js Starter Kit](https://github.com/kriasoft/node-starter-kit).
Be sure to join our [Discord channel](https://discord.com/invite/bSsv7XM) for assistance.

## Tech Stack

- [Node.js](https://nodejs.org/) v14, [Yarn](https://yarnpkg.com/) package manager, [TypeScript](https://www.typescriptlang.org/), [Babel](https://babeljs.io/), [Rollup](https://rollupjs.org/)
- [PostgreSQL](https://www.postgresql.org/), [TypeORM](https://typeorm.io/), [Express](https://expressjs.com/)

## Directory Structure

`├──`[`.build`](.build) — Compiled and bundled output (per cloud function)<br>
`├──`[`.vscode`](.vscode) — VSCode settings including code snippets, recommended extensions etc.<br>
`├──`[`api`](./api) — cloud function for handling API requests<br>
`├──`[`auth`](./auth) — cloud function for handling authentication<br>
`├──`[`env`](./env) — environment variables for `local`, `dev`, `test`, and `prod`<br>
`├──`[`migrations`](./migrations) — database schema migrations ([Cloud SQL](https://cloud.google.com/sql), [TypeORM](https://typeorm.io/))<br>
`├──`[`models`](./models) — [TypeORM](https://typeorm.io/) data models<br>
`├──`[`scripts`](./scripts) — Deployment scripts, etc.<br>
`└── ...` — add more cloud functions such as `worker`, `notifications`, etc.

## Requirements

- [Node.js](https://nodejs.org/) v14, [Yarn](https://yarnpkg.com/) package manager
- Local or remote instance of [PostgreSQL](https://www.postgresql.org/) (see [Postgres.app](https://postgresapp.com/), [Google Cloud SQL](https://cloud.google.com/sql))
- [VS Code](https://code.visualstudio.com/) editor with [recommended extensions](.vscode/extensions.json)

## Getting Started

- Clone the repo — `git clone https://github.com/kriasoft/node-starter-kit.git <dir>`.
- Install project dependencies — `yarn install`
- Finally, launch the app — `yarn start` which will become available at [http://localhost:8080](http://localhost:8080/).

## Related Projects

- [GraphQL API Starter Kit](https://github.com/kriasoft/graphql-starter) — project template, pre-configured with TypeScript, GraphQL.js, React, and Relay.

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
