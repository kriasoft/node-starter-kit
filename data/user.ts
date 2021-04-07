/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column("citext")
  email: string;
}
