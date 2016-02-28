# GraphQL Sandbox

![Version](https://img.shields.io/badge/version-0.0.1-green.svg?style=flat-square)
[![MIT License](https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat-square)](./LICENSE.txt)
[![Chat](https://img.shields.io/badge/chat-general_discussion-blue.svg?style=flat-square)](https://github.com/kriasoft/graphql-sandbox/issues/1)

> This is a [forked](https://help.github.com/articles/fork-a-repo/) copy of the
> [GraphQL Sandbox](https://github.com/kriasoft/graphql-sandbox) repository,
> helping you to learn how a GraphQL server for [this example schema](./SCHEMA.md)
> may look like implemented with `<your-solution-stack>`. For the full list of
> GraphQL Sandbox implementations visit [https://graphqlsandbox.com](https://graphqlsandbox.com).

### Directory Layout

```
.
├── /data/                      # Sample data set in JSON and SQLite formats
├── /src/                       # The source code of the GraphQL server
│   └── /...                    # ...
├── /test/                      # Integration tests and benchmarks
│── LICENSE.txt                 # Free software license
│── package.json                # Node.js modules used in tests
│── README.md                   # Project description and getting started guide
└── SCHEMA.md                   # GraphQL schema specification
```

### Getting Started

Before you can launch the GraphQL server and automated test suite, you development
environment should meet the following criteria:

  * Mac OS X, Windows, or Linux operating system
  * [Node.js](https://nodejs.org/) v5.0, or newer (for running tests)
  * ...

To launch the server, run the following command in your terminal or console window:

```sh
$ ...
```

After launching the server, the [*GraphiQL* IDE](https://github.com/graphql/graphiql)
should become available to you at [localhost:3000](http://localhost:3000/).

To start the automated test suite, run:

```sh
$ npm install
$ npm test
```

### Learn More

New to GraphQL? Check out these links:

  * [Exploring GraphQL](https://www.youtube.com/watch?v=_9RgHXqH8J0) video on YouTube by Nick Schrock, Facebook
  * [graphql.org](http://graphql.org/) — GraphQL project's homepage with docs and announcements
  * [facebook.github.io/graphql/](http://facebook.github.io/graphql/) — Working Draft RFC Specification for GraphQL

### License

[MIT](./LICENSE.txt) © Konstantin Tarkus, `<your-name>`
