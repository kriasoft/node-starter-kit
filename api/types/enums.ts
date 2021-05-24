/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { GraphQLEnumType } from "graphql";
import { mapValues } from "lodash";
import { IdentityProvider } from "../../db";

export const IdentityProviderType = new GraphQLEnumType({
  name: "IdentityProvider",
  description: "OAuth identity provider.",
  values: mapValues(IdentityProvider, (value) => ({ value })),
});
