import { Request, Response } from "express";
import { createQuestionService } from "../services/CreateQuestionService";
import { makeResponse } from "./helpers/makeResponse";

export class CreateQuestionsController {
  async handle(request: Request, response: Response) {
    const { title, description, type, theme, subtheme, options, answer } =
      request.body;

    const questionResponse = await createQuestionService({
      title,
      description,
      type,
      theme,
      subtheme,
      options,
      answer,
    });

    return makeResponse(response, questionResponse);
  }
}
