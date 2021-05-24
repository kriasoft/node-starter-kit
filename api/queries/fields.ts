/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { GraphQLFieldConfig, GraphQLInt, GraphQLNonNull } from "graphql";
import type { Knex } from "knex";
import { Context } from "../context";

export const countField: GraphQLFieldConfig<
  { query: Knex.QueryBuilder },
  Context
> = {
  type: new GraphQLNonNull(GraphQLInt),

  async resolve(self) {
    const rows = await self.query.count();
    return rows[0].count;
  },
};
