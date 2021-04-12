/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import "knex";

declare module "knex" {
  namespace Knex {
    interface FunctionHelper {
      /**
       * Generate a new short user ID.
       */
      newUserId: (unique?: boolean) => Promise<string>;
    }
  }
}
