/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Load environment variables (PGHOST, PGUSER, etc.)
 *
 * @see https://jestjs.io/docs/configuration#globalsetup-string
 */
export default function (): void {
  require("../env/config");
}
