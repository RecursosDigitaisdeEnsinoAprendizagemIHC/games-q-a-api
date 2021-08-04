import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionOptionRepository } from "../repositories/QuestionOptionRepository";
import { AnswerRepository } from "../repositories/AnswerRepository";

interface IAnswerRequest {
  option: string;
  reason: string;
}

interface IQuestionOptionRequest {
  option: string;
  description: string;
}

interface IQuestionRequest {
  title: string;
  type: string;
  theme: string;
  subtheme?: string;
  options?: IQuestionOptionRequest[];
  answer: IAnswerRequest;
}

export const createQuestionService = async ({
  title,
  type,
  theme,
  subtheme,
  options = [],
  answer,
}: IQuestionRequest) => {
  const questionRepository = getCustomRepository(QuestionRepository);
  const questionOptionRepository = getCustomRepository(
    QuestionOptionRepository
  );
  const answerRepository = getCustomRepository(AnswerRepository);

  const question = await questionRepository.create({
    title,
    type,
    theme,
    subtheme,
  });

  await questionRepository.save(question);

  for (let option of options) {
    let questionOption = questionOptionRepository.create({
      question: question,
      option: option.option,
      description: option.description,
    });
    await questionOptionRepository.save(questionOption);
  }

  const answerObj = answerRepository.create({
    question: question,
    option: answer.option,
    reason: answer.reason,
  });
  await answerRepository.save(answerObj);

  return question;
};
