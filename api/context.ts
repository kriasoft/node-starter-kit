/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import DataLoader from "dataloader";
import { Request } from "express";
import { Forbidden, Unauthorized } from "http-errors";
import db, { Identity, User } from "../db";
import { mapTo, mapToMany } from "./utils";

/**
 * GraphQL execution context.
 * @see https://graphql.org/learn/execution/
 */
export class Context {
  private readonly req: Request;

  constructor(req: Request) {
    this.req = req;

    // Add the currently logged in user object to the cache
    if (req.user) {
      this.userById.prime(req.user.id, req.user);
      if (req.user.username) {
        this.userByUsername.prime(req.user.username, req.user);
      }
    }
  }

  /*
   * Authentication and authorization
   * ------------------------------------------------------------------------ */

  get user(): User | null {
    return this.req.user;
  }

  signIn(user: User | null | undefined): Promise<User | null> {
    return this.req.signIn(user);
  }

  signOut(): void {
    this.req.signOut();
  }

  ensureAuthorized(check?: (user: User) => boolean): void {
    if (!this.req.user) {
      throw new Unauthorized();
    }

    if (check && !check(this.req.user)) {
      throw new Forbidden();
    }
  }

  /*
   * Data loaders
   * ------------------------------------------------------------------------ */

  userById = new DataLoader<string, User | null>((keys) =>
    db
      .table<User>("user")
      .whereIn("id", keys)
      .select()
      .then((rows) =>
        rows.map((x) => {
          if (x.username) this.userByUsername.prime(x.username, x);
          return x;
        })
      )
      .then((rows) => mapTo(rows, keys, (x) => x.id))
  );

  userByUsername = new DataLoader<string, User | null>((keys) =>
    db
      .table<User>("user")
      .whereIn("username", keys)
      .select()
      .then((rows) =>
        rows.map((x) => {
          this.userById.prime(x.id, x);
          return x;
        })
      )
      .then((rows) => mapTo(rows, keys, (x) => x.username))
  );

  identitiesByUserId = new DataLoader<string, Identity[]>((keys) =>
    db
      .table<Identity>("identity")
      .whereIn("user_id", keys)
      .select()
      .then((rows) => mapToMany(rows, keys, (x) => x.user_id))
  );
}
