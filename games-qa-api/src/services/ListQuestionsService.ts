import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";

export const listQuestionsService = async (theme: string = null) => {
  const questionRepository = getCustomRepository(QuestionRepository);

  let questions = [];
  if (!theme) {
    questions = await questionRepository.findAll();
  } else {
    questions = await questionRepository.findByTheme(theme);
  }

  return questions;
};
