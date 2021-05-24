/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import express from "express";
import request from "supertest";
import { api } from "../api";

const app = express();
app.use(api);

describe("Fetch logged-in user", function () {
  test("as unauthenticated user", async function () {
    const res = await request(app)
      .get("/api")
      .accept("application/json")
      .query({
        query: `
          query {
            me {
              id
              email
            }
          }
        `,
      });
    expect(res.status).toBe(200);
    expect(res.text).toMatchInlineSnapshot(`
      "{
        \\"data\\": {
          \\"me\\": null
        }
      }"
    `);
  });
});
