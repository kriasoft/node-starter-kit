// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

import { Knex } from "knex";

export enum IdentityProvider {
  Google = "google",
  Apple = "apple",
  Facebook = "facebook",
  GitHub = "github",
  LinkedIn = "linkedin",
  Microsoft = "microsoft",
  Twitter = "twitter",
  Yahoo = "yahoo",
  GameCenter = "gamecenter",
  PlayGames = "playgames",
}

export enum Table {
  Identity = "identity",
  Migration = "migration",
  MigrationLock = "migration_lock",
  User = "user",
}

export type Identity = {
  id: string;
  provider: IdentityProvider;
  user_id: string;
  username: string | null;
  email: string | null;
  credentials: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
};

export type Migration = {
  id: number;
  name: string | null;
  batch: number | null;
  migration_time: Date | null;
};

export type MigrationLock = {
  index: number;
  is_locked: number | null;
};

export type User = {
  id: string;
  username: string | null;
  email: string | null;
  email_verified: boolean;
  password: string | null;
  name: string | null;
  picture: Record<string, unknown>;
  time_zone: string | null;
  locale: string | null;
  admin: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type IdentityRecord = {
  id: Knex.Raw | string;
  provider: Knex.Raw | IdentityProvider;
  user_id: Knex.Raw | string;
  username?: Knex.Raw | string | null;
  email?: Knex.Raw | string | null;
  credentials?: Knex.Raw | string;
  created_at?: Knex.Raw | Date | string;
  updated_at?: Knex.Raw | Date | string;
};

export type MigrationRecord = {
  id?: Knex.Raw | number;
  name?: Knex.Raw | string | null;
  batch?: Knex.Raw | number | null;
  migration_time?: Knex.Raw | Date | string | null;
};

export type MigrationLockRecord = {
  index?: Knex.Raw | number;
  is_locked?: Knex.Raw | number | null;
};

export type UserRecord = {
  id: Knex.Raw | string;
  username?: Knex.Raw | string | null;
  email?: Knex.Raw | string | null;
  email_verified?: Knex.Raw | boolean;
  password?: Knex.Raw | string | null;
  name?: Knex.Raw | string | null;
  picture?: Knex.Raw | string;
  time_zone?: Knex.Raw | string | null;
  locale?: Knex.Raw | string | null;
  admin?: Knex.Raw | boolean;
  last_login?: Knex.Raw | Date | string | null;
  created_at?: Knex.Raw | Date | string;
  updated_at?: Knex.Raw | Date | string;
  deleted_at?: Knex.Raw | Date | string | null;
};

