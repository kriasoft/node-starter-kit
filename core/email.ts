/* SPDX-FileCopyrightText: 2016-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

import Email from "email-templates";
import env from "../env";

/**
 * Email renderer and sender (for transactional emails).
 *
 * @see https://github.com/forwardemail/email-templates
 */
export const email = new Email({
  message: {
    from: `"${env.APP_NAME}" <${env.EMAIL_FROM}>`,
  },
  views: {
    options: {
      extension: "hbs",
    },
    locals: {
      appName: env.APP_NAME,
    },
  },
  // https://nodemailer.com/smtp/
  transport: {
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: env.EMAIL_FROM,
      pass: env.EMAIL_PASSWORD,
    },
  },
});
