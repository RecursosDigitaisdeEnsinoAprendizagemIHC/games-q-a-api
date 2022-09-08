import { Request, Response } from "express";
import { authService } from "../services/AuthService";
import { makeResponse } from "./helpers/makeResponse";

export class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authResponse = await authService({ email, password });
    return makeResponse(response, authResponse);
  }
}
