import { Request, Response } from "express";
import { authService } from "../services/AuthService";

export class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const token = await authService({ email, password });

    return response.json(token);
  }
}
