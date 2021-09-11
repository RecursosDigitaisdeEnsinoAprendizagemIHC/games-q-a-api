import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";

interface IQuestionAnswer {
  questionId?: number;
}

export const getQuestionAnswerService = async ({
  questionId,
}: IQuestionAnswer) => {
  const questionRepository = getCustomRepository(QuestionRepository);
  return await questionRepository.findOneWithAnwser(questionId);
};
