import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entities/Question";

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  relationsData = {
    relations: ["questionOptions", "answer"],
  };

  findAll() {
    return this.find({ ...this.relationsData });
  }

  findByTheme(theme: string) {
    return this.find({
      where: {
        theme,
      },
      ...this.relationsData,
    });
  }
}
