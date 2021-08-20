import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";

interface IQuestionFilters {
  theme?: string;
  subtheme?: string;
}

export const listQuestionsService = async ({
  theme,
  subtheme,
}: IQuestionFilters) => {
  const questionRepository = getCustomRepository(QuestionRepository);

  let questions = [];
  if (!theme) {
    questions = await questionRepository.findAll();
  } else {
    questions = await questionRepository.findByTheme(theme, subtheme);
  }

  return questions;
};
