/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { Context } from "../context";

/**
 * The Node interface.
 * https://relay.dev/graphql/objectidentification.htm
 */
export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  (globalId, context: Context) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case "User":
        return context.userById.load(id);
      default:
        return null;
    }
  },
  (obj) => {
    /* eslint-disable @typescript-eslint/no-var-requires */
    if (obj.email !== undefined) {
      return require("../types").UserType;
    }

    return null;
  }
);
