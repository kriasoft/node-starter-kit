/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import { RequestHandler, Router } from "express";
import * as facebook from "./facebook";
import session from "./session";

export const auth = Router();

const noCache: RequestHandler = function (req, res, next) {
  res.setHeader("Cache-Control", "no-store");
  next();
};

auth.use(session);

auth.use("/auth/facebook", noCache, facebook.redirect);
auth.use("/auth/facebook/return", noCache, facebook.callback);

export { session };
