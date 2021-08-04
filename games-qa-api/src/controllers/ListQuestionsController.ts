import { Request, Response } from "express";
import { listQuestionsService } from "../services/ListQuestionsService";

export class ListQuestionsController {
  async handle(request: Request, response: Response) {
    const theme = request.query.theme as string;

    const questions = await listQuestionsService(theme);

    return response.json(questions);
  }
}
