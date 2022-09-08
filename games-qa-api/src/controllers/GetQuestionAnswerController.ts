import { Request, Response } from "express";
import { getQuestionAnswerService } from "../services/GetQuestionAnswerService";
import { makeResponse } from "./helpers/makeResponse";

export class GetQuestionAnswerController {
  async handle(request: Request, response: Response) {
    const questionId = parseInt(request.params.id);

    const questionAnswer = await getQuestionAnswerService({ questionId });

    return  makeResponse(response, questionAnswer)
  }
}
