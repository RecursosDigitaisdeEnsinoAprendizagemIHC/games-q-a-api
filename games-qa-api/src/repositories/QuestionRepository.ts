import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entities/Question";

interface IFilters {
  theme?: string;
  subtheme?: string;
}

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  relationsData = {
    relations: ["questionOptions"],
  };

  findAll() {
    return this.find({ ...this.relationsData });
  }

  findOneWithAnwser(questionId: number) {
    return this.find({ where: { id: questionId }, relations: ["answer"] });
  }

  findByTheme(theme: string, subtheme: string) {
    const filters: IFilters = {};
    if (theme) {
      filters.theme = theme;
    }
    if (subtheme) {
      filters.subtheme = subtheme;
    }

    return this.find({
      where: filters,
      ...this.relationsData,
    });
  }
}
