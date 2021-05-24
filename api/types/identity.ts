/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { IdentityProviderType } from "./enums";

export const IdentityType = new GraphQLObjectType({
  name: "Identity",
  description: "The OAuth user identity (credentials).",

  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(self) {
        return `${self.provider}:${self.id}`;
      },
    },

    provider: {
      type: new GraphQLNonNull(IdentityProviderType),
    },

    email: {
      type: GraphQLString,
    },
  },
});
