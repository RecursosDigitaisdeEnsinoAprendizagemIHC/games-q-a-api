import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionOptionRepository } from "../repositories/QuestionOptionRepository";
import { AnswerRepository } from "../repositories/AnswerRepository";
import {
  QUESTION_TYPES,
  QUESTION_THEMES,
  QUESTION_SUBTHEMES,
} from "../entities/Question";

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
  description: string;
  type: string;
  theme: string;
  subtheme?: string;
  options?: IQuestionOptionRequest[];
  answer: IAnswerRequest;
}

export const createQuestionService = async ({
  title,
  description,
  type,
  theme,
  subtheme,
  options = [],
  answer,
}: IQuestionRequest) => {
  if (!QUESTION_TYPES.includes(type)) {
    throw new Error(`Invalid type '${type}'`);
  }

  if (!QUESTION_THEMES.includes(theme)) {
    throw new Error(`Invalid theme '${theme}'`);
  }

  if (subtheme && !QUESTION_SUBTHEMES[theme].includes(subtheme)) {
    throw new Error(`Invalid subtheme '${subtheme}' of theme ${theme}`);
  }

  const questionRepository = getCustomRepository(QuestionRepository);
  const questionOptionRepository = getCustomRepository(
    QuestionOptionRepository
  );
  const answerRepository = getCustomRepository(AnswerRepository);

  const question = await questionRepository.create({
    title,
    description,
    type,
    theme,
    subtheme,
  });

  await questionRepository.save(question);

  for (const option of options) {
    const questionOption = questionOptionRepository.create({
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
