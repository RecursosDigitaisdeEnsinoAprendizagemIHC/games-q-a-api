import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Answer } from "./Answer";
import { QuestionOption } from "./QuestionOption";

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

  @OneToMany(() => QuestionOption, (questionOption) => questionOption.question)
  questionOptions: QuestionOption[];

  @OneToOne(() => Answer, (answer) => answer.question)
  answer: Answer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export const QUESTION_TYPES = ["ME", "VF"];
export const QUESTION_THEMES = ["persona"];
export const QUESTION_SUBTHEMES = {
  persona: ["persona_concepts", "persona_creation"],
};
