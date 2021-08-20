import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("question_options")
export class QuestionOption {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "question_id" })
  questionId: number;

  @JoinColumn({ name: "question_id" })
  @ManyToOne(() => Question, (question) => question.questionOptions)
  question: Question;

  @Column()
  option: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
