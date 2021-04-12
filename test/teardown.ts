/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import db from "../db";

/**
 * Close open database connections once the tests execution was finished.
 *
 * @see https://jestjs.io/docs/configuration#globalteardown-string
 */
export default function (): Promise<void> {
  return db.destroy();
}
