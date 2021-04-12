/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

// Load environment variables (PGHOST, PGUSER, etc.)
require("./env/config");

module.exports = require("./db/config");
