/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import type { User } from "./models";

declare global {
  namespace Express {
    interface Request {
      user: User | null;
      signIn: (user: User | null | undefined) => Promise<User | null>;
      signOut: () => void;
    }
  }
}
