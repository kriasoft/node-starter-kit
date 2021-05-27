/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { GraphQLObjectType, GraphQLString } from "graphql";
import type { Identity } from "../../db";
import { Context } from "../context";

export const PictureType = new GraphQLObjectType<Identity, Context>({
  name: "Picture",

  fields: {
    url: {
      type: GraphQLString,
    },
  },
});
