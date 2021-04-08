/**
 * @copyright 2016-present Kriasoft (https://git.io/JYNud)
 */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
class User {
  @PrimaryColumn({ type: "text" })
  id: string;

  @Column("citext")
  email: string;

  @CreateDateColumn({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "datetime" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime" })
  deletedAt: Date;
}

export { User };
