/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import { RequestHandler } from "express";
import { AuthorizationCode } from "simple-oauth2";
import env from "../env";

const scope = ["email"];
const version = "v10.0";
const client = new AuthorizationCode({
  client: {
    id: env.FACEBOOK_APP_ID,
    secret: env.FACEBOOK_APP_SECRET,
  },
  auth: {
    tokenHost: "https://graph.facebook.com",
    tokenPath: `/${version}/oauth/access_token`,
    authorizeHost: "https://www.facebook.com",
    authorizePath: `/${version}/dialog/oauth`,
  },
});

export const redirect: RequestHandler = function (req, res) {
  const authorizeUrl = client.authorizeURL({
    redirect_uri: req.app.locals["redirect_uri"],
    scope,
  });

  res.redirect(authorizeUrl);
};

export const callback: RequestHandler = async function (req, res, next) {
  try {
    const { token } = await client.getToken({
      code: req.query.code as string,
      redirect_uri: req.app.locals["redirect_uri"],
      scope,
    });

    // TODO: Link credentials to the user account
    console.log(token);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
