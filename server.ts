/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import express from "express";
import { auth } from "./auth";
import { api } from "./api";

const app = express();
const port = process.env.PORT ?? 8080;

app.use(auth);
app.use(api);

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}/`);
});
