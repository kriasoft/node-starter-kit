/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import { Router } from "express";
import session from "../auth/session";

export const api = Router();

api.use(session);

api.get("/", (req, res) => {
  res.send("Hello from API!");
});
