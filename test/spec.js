/**
 * GraphQL Sandbox (https://graphqlsandbox.com/)
 *
 * Copyright © Konstantin Tarkus, <your-name>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import fetch from 'node-fetch';
import { expect } from 'chai';

const url = 'http://localhost:3000/';

describe('GraphQL server', () => {
  it(`should listen on ${url}`, async () => {
    const response = await fetch(url);
    expect(response.ok).to.be.ok;
  });
});
