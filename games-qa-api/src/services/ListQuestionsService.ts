import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { serverError } from "./helpers copy/erros";
import { success } from "./helpers copy/success";

interface IQuestionFilters {
  theme?: string;
  subtheme?: string;
}

export const listQuestionsService = async ({
  theme,
  subtheme,
}: IQuestionFilters) => {
  try {
    const questionRepository = getCustomRepository(QuestionRepository);

    let questions = [];
    if (!theme) {
      questions = await questionRepository.findAll();
    } else {
      questions = await questionRepository.findByTheme(theme, subtheme);
    }
    return success(questions)
  } catch (error) {
    console.log(error);
    return serverError()
  }
  
};
