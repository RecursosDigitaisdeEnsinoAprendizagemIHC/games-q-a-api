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
import { QuestionOption } from "./QuestionOption";

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @JoinColumn({ name: "question_id" })
  @ManyToOne(() => Question)
  questionId: Question;

  @JoinColumn({ name: "question_option_id" })
  @ManyToOne(() => QuestionOption)
  questionOptionId: QuestionOption;

  @Column()
  reason: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
