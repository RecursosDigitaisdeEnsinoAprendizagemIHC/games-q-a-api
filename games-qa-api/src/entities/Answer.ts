import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "question_id" })
  questionId: number;

  @JoinColumn({ name: "question_id" })
  @OneToOne(() => Question, (question) => question.answer)
  question: Question;

  @Column()
  option: string;

  @Column()
  reason: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
