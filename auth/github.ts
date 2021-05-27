/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { RequestHandler } from "express";
import got from "got";
import { AuthorizationCode } from "simple-oauth2";
import { IdentityProvider } from "../db";
import env from "../env";
import authorize from "./authorize";
import { createState, verifyState } from "./state";

/**
 * OAuth 2.0 client for GitHub.
 *
 * @see https://github.com/lelylan/simple-oauth2
 * @see https://docs.github.com/en/developers/apps/authorizing-oauth-apps
 */
const oauth = new AuthorizationCode({
  client: { id: env.GITHUB_CLIENT_ID, secret: env.GITHUB_CLIENT_SECRET },
  auth: {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizeHost: "https://github.com",
    authorizePath: "/login/oauth/authorize",
  },
});

/**
 * Redirects user to GitHub login page.
 */
export const redirect: RequestHandler = function (req, res) {
  const scope = (req.query.scope as string) ?? "";
  const state = createState({ scope });
  const { redirect_uri } = req.app.locals;
  const authorizeUrl = oauth.authorizeURL({ redirect_uri, scope, state });
  res.redirect(authorizeUrl);
};

/**
 * Obtains authorization tokens and profile information once the user
 * returns from Facebook website.
 */
export const callback: RequestHandler = async function (req, res, next) {
  try {
    const { scope } = verifyState(req.query.state as string) as {
      scope?: string;
    };
    const { code } = req.query as { code: string };
    const { redirect_uri } = req.app.locals;
    const { token } = await oauth.getToken({ code, redirect_uri, scope });

    // Fetch profile information
    const profile = await got("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token.access_token}`,
      },
    }).json<{
      id: number;
      login: string;
      avatar_url: string;
      name: string;
      email: string;
    }>();

    // Link OAuth credentials with the user account.
    const me = await authorize(req, {
      id: String(profile.id),
      provider: IdentityProvider.GitHub,
      username: profile.login,
      email: profile.email,
      email_verified: true,
      name: profile.name,
      picture: profile.avatar_url,
      credentials: token as unknown as Record<string, string>,
    });

    res.render("auth-callback", { data: { me }, layout: false });
  } catch (err) {
    next(err);
  }
};
