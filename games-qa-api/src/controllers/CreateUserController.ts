import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { createUserService } from "../services/CreateUserService";
import { UserRepository } from "../repositories/UserRepository";

export class CreateUserAuthenticatedController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;
    const { userId } = request;

    const userRepository = getCustomRepository(UserRepository);
    const loggedUser = await userRepository.findOne(userId);

    const newAdmin: boolean = loggedUser.admin ? admin : false;

    const user = await createUserService({
      name,
      email,
      password,
      admin: newAdmin,
    });

    return response.json(user);
  }
}

export class CreateRegularUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = await createUserService({
      name,
      email,
      password,
      admin: false,
    });

    return response.json(user);
  }
}
