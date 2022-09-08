import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { createUserService } from "../services/CreateUserService";
import { UserRepository } from "../repositories/UserRepository";
import { makeResponse } from "./helpers/makeResponse";

export class CreateUserAuthenticatedController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;
    const { userId } = request;

    const userRepository = getCustomRepository(UserRepository);
    const loggedUser = await userRepository.findOne(userId);

    const newAdmin: boolean = loggedUser.admin ? admin : false;

    const userResponse = await createUserService({
      name,
      email,
      password,
      admin: newAdmin,
    });

    return  makeResponse(response, userResponse);
  }
}

export class CreateRegularUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userResponse = await createUserService({
      name,
      email,
      password,
      admin: false,
    });

    return  makeResponse(response, userResponse)
  }
}
