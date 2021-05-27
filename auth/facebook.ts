/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import { RequestHandler } from "express";
import got from "got";
import { AuthorizationCode } from "simple-oauth2";
import { IdentityProvider } from "../db";
import env from "../env";
import authorize from "./authorize";
import { createState, verifyState } from "./state";

const scope = ["email"];
const version = "v10.0";

/**
 * OAuth 2.0 client for Facebook.
 *
 * @see https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
 */
const oauth = new AuthorizationCode({
  client: { id: env.FACEBOOK_APP_ID, secret: env.FACEBOOK_APP_SECRET },
  auth: {
    tokenHost: "https://graph.facebook.com",
    tokenPath: `/${version}/oauth/access_token`,
    authorizeHost: "https://www.facebook.com",
    authorizePath: `/${version}/dialog/oauth`,
  },
});

/**
 * Redirects user to Facebook login page.
 */
export const redirect: RequestHandler = function (req, res) {
  const { redirect_uri } = req.app.locals;
  const state = createState({});
  const authorizeUrl = oauth.authorizeURL({ redirect_uri, scope, state });
  res.redirect(authorizeUrl);
};

/**
 * Obtains authorization tokens and profile information once the user
 * returns from Facebook website.
 */
export const callback: RequestHandler = async function (req, res, next) {
  try {
    verifyState(req.query.state as string);
    const { code } = req.query as { code: string };
    const { redirect_uri } = req.app.locals;
    const { token } = await oauth.getToken({ code, redirect_uri, scope });

    // Fetch profile information
    // https://developers.facebook.com/docs/graph-api/reference/user
    const { access_token } = token;
    const profile = await got
      .get({
        url: `https://graph.facebook.com/${version}/me`,
        searchParams: { access_token, fields: "id,name,email,picture" },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .json<{ id: string; name: string; email?: string; picture?: any }>();

    // Link OAuth credentials with the user account.
    const me = await authorize(req, {
      id: profile.id,
      provider: IdentityProvider.Facebook,
      name: profile.name,
      email: profile.email,
      email_verified: profile.email ? true : false,
      picture: profile.picture?.data,
      credentials: token,
    });

    res.render("auth-callback", { data: { me }, layout: false });
  } catch (err) {
    next(err);
  }
};
