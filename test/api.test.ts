/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import express from "express";
import request from "supertest";
import { api } from "../api";

const app = express();
app.use(api);

test("/api/", async function () {
  expect.assertions(2);
  await request(app)
    .get("/api/")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatchInlineSnapshot(`"Hello from API!"`);
    });
});
