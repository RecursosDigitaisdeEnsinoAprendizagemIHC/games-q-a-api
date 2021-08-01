import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  theme: string;

  @Column()
  subtheme: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
