import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { serverError } from "./helpers copy/erros";
import { success } from "./helpers copy/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

interface IQuestionAnswer {
  questionId?: number;
}

export const getQuestionAnswerService = async ({
  questionId,
}: IQuestionAnswer): Promise<ServiceResponseInterface> => {
  try {
    const questionRepository = getCustomRepository(QuestionRepository);
    const questionAnswer =  await questionRepository.findOneWithAnwser(questionId);
    return success(questionAnswer)
  } catch (error) {
    console.log(error);
    return serverError()
  }
};
