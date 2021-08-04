import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entities/Question";

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  findByTheme(theme: string) {
    return this.find({
      where: {
        theme,
      },
      relations: ["questionOptions"],
      join: {
        alias: "question",
        leftJoinAndSelect: {
          answer: "question.answer",
          questionOption: "answer.questionOption",
        },
      },
    });
  }
}
