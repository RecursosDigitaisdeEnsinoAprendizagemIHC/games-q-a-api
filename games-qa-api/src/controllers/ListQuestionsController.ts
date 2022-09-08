import { Request, Response } from "express";
import { listQuestionsService } from "../services/ListQuestionsService";
import { makeResponse } from "./helpers/makeResponse";

export class ListQuestionsController {
  async handle(request: Request, response: Response) {
    const theme = (request.query.theme as string) || "";
    const subtheme = (request.query.subtheme as string) || "";

    const questionsResponse = await listQuestionsService({ theme, subtheme });
    return makeResponse(response, questionsResponse);
  }
}
