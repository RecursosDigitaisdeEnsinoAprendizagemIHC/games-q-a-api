import { Request, Response } from "express";
import { createQuestionService } from "../services/CreateQuestionService";

export class CreateQuestionsController {
  async handle(request: Request, response: Response) {
    const { title, description, type, theme, subtheme, options, answer } =
      request.body;

    const question = await createQuestionService({
      title,
      description,
      type,
      theme,
      subtheme,
      options,
      answer,
    });

    return response.json(question);
  }
}
