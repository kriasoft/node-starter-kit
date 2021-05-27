/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { Request } from "express";
import { toGlobalId } from "graphql-relay";
import type { Identity, User } from "../db";
import db from "../db";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Links OAuth credentials (identity) to a user account.
 */
export default async function authorize(
  req: Request,
  identity: Partial<Omit<Identity, "user_id">> & {
    email_verified?: boolean;
    name?: string | null;
    picture?: string | Record<string, unknown> | null;
  }
): Promise<Record<string, unknown> | null> {
  // Get the currently authenticated user from session
  let user: User | null | undefined = req.user;

  // If user is not authenticated, find user by credentials
  if (!user) {
    user = await db
      .table<Identity>("identity")
      .leftJoin<User>("user", "user.id", "identity.user_id")
      .where({
        "identity.id": identity.id,
        "identity.provider": identity.provider,
      } as any)
      .first<User>("user.*");
  }

  // Otherwise, find user account by email
  if (!user && identity.email && identity.email_verified) {
    user = await db
      .table<User>("user")
      .where({ email: identity.email })
      .orderBy("email_verified", "desc")
      .first();
  }

  // Alternatively, create a new user account
  if (!user) {
    const usernameAvailable =
      Boolean(identity.username) &&
      (await db
        .table<User>("user")
        .where({ username: identity.username })
        .first(db.raw(1))
        .then((x) => !x));

    [user] = await db
      .table<User>("user")
      .insert({
        id: await db.fn.newUserId(),
        username: usernameAvailable ? identity.username : null,
        email: identity.email,
        name: identity.name,
        picture: identity.picture
          ? (JSON.stringify(
              typeof identity.picture === "string"
                ? { url: identity.picture }
                : identity.picture
            ) as unknown as Record<string, unknown>)
          : db.raw("DEFAULT"),
      })
      .returning("*");
  }

  // Link credentials to user account
  if (user) {
    const key = { provider: identity.provider, id: identity.id };
    const dbIdentity = await db.table<Identity>("identity").where(key).first();

    if (dbIdentity) {
      if (dbIdentity.user_id !== user.id) {
        throw new Error(
          "These credentials already linked to another user account."
        );
      }

      await db
        .table<Identity>("identity")
        .where(key)
        .update({
          id: identity.id,
          provider: identity.provider,
          user_id: user.id,
          username: identity.username,
          email: identity.email,
          credentials: JSON.stringify(
            identity.credentials
          ) as unknown as Record<string, unknown>,
          updated_at: db.fn.now(),
        });
    } else {
      await db.table<Identity>("identity").insert({
        id: identity.id,
        provider: identity.provider,
        user_id: user.id,
        username: identity.username,
        email: identity.email,
        credentials: JSON.stringify(identity.credentials) as unknown as Record<
          string,
          unknown
        >,
      });
    }
  }

  user = await req.signIn(user);

  return (
    user && {
      id: toGlobalId("User", user.id),
      username: user.username,
      name: user.name,
      email: user.email,
      emailVerified: user.email_verified,
      picture: user.picture,
      timeZone: user.time_zone,
      locale: user.locale,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      lastLogin: user.last_login,
    }
  );
}
