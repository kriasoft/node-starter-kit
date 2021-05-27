/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

// Load environment variables (PGHOST, PGUSER, etc.)
require("../env/config");
// Allow to import TypeScript files compiled on the fly via Babel
require("@babel/register")({ extensions: [".ts"], cache: false });

const { updateSchema } = require("../api/graphql");

/**
 * Generates `schema.graphql` file from the actual GraphQL schema.
 */
updateSchema((err) => {
  if (err) {
    console.err(err);
    process.exit(1);
  }
});
