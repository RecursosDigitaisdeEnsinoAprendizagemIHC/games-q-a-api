import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
