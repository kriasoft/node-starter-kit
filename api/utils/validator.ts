/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

export class ValidationError extends Error {
  readonly code = 422;
  readonly errors: { [key: string]: string[] };

  constructor(
    errors: { [key: string]: string[] },
    message = "Validation failed."
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.errors = errors;
  }
}
