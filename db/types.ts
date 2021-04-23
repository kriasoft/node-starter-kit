// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

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
