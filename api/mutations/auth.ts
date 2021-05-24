/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { Context } from "../context";

export const signOut: GraphQLFieldConfig<unknown, Context> = {
  description: "Clears authentication session.",
  type: GraphQLString,

  resolve(self, args, ctx) {
    ctx.signOut();
  },
};
