import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entities/Question";

interface IFilters {
  theme?: string;
  subtheme?: string;
}

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  relationsData = {
    relations: ["questionOptions", "answer"],
  };

  findAll() {
    return this.find({ ...this.relationsData });
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
