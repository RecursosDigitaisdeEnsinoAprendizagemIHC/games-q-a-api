import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";

export const listQuestionsService = async (theme: string) => {
  const questionRepository = getCustomRepository(QuestionRepository);

  const questions = await questionRepository.findByTheme(theme);

  return questions;
};
