/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import { RequestHandler, Router } from "express";
import env from "../env";
import * as facebook from "./facebook";
import session from "./session";

export const auth = Router();

const common: RequestHandler = function (req, res, next) {
  const [, prefix, provider] = req.path.split("/");
  req.app.locals["redirect_uri"] = env.isProduction
    ? `${env.APP_ORIGIN}/${prefix}/${provider}/return`
    : `${req.protocol}://${req.get("host")}/${prefix}/${provider}/return`;

  res.setHeader("Cache-Control", "no-store");
  next();
};

auth.use(session);

auth.get("/auth/facebook", common, facebook.redirect);
auth.get("/auth/facebook/return", common, facebook.callback);

export { session };
