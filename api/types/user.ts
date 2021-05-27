/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import type { User } from "../../db";
import { Context } from "../context";
import { dateField } from "./fields";
import { IdentityType } from "./identity";
import { nodeInterface } from "./node";
import { PictureType } from "./picture";

export const UserType = new GraphQLObjectType<User, Context>({
  name: "User",
  description: "The registered user account.",
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    username: {
      type: GraphQLString,
    },

    email: {
      type: GraphQLString,
      resolve(self, args, ctx) {
        return ctx.user && (ctx.user.id === self.id || ctx.user.admin)
          ? self.email
          : null;
      },
    },

    emailVerified: {
      type: GraphQLBoolean,
      resolve(self, args, ctx) {
        return ctx.user && (ctx.user.id === self.id || ctx.user.admin)
          ? self.email_verified
          : null;
      },
    },

    name: {
      type: GraphQLString,
    },

    picture: {
      type: PictureType,
    },

    timeZone: {
      type: GraphQLString,
      resolve(self) {
        return self.time_zone;
      },
    },

    locale: {
      type: GraphQLString,
    },

    identities: {
      type: new GraphQLList(new GraphQLNonNull(IdentityType)),
      resolve(self, args, ctx) {
        return ctx.user && (ctx.user.id === self.id || ctx.user.admin)
          ? ctx.identitiesByUserId.load(self.id)
          : null;
      },
    },

    createdAt: dateField((self) => self.created_at),
    updatedAt: dateField((self) => self.updated_at),
    lastLogin: dateField((self) => self.last_login),
  },
});
