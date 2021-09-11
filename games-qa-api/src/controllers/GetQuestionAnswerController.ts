import { Request, Response } from "express";
import { getQuestionAnswerService } from "../services/GetQuestionAnswerService";

export class GetQuestionAnswerController {
  async handle(request: Request, response: Response) {
    const questionId = parseInt(request.params.id);

    const questionAnswer = await getQuestionAnswerService({ questionId });

    return response.json(questionAnswer);
  }
}
