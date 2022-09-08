import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";
import { incorrectData, serverError } from "./helpers copy/erros";
import { success } from "./helpers copy/success";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export const createUserService = async ({
  name,
  email,
  password,
  admin = false,
}: IUserRequest):Promise<ServiceResponseInterface> => {
  try {
    const userRepository = getCustomRepository(UserRepository);

    if (!email) {
      return incorrectData('Email')
    }
  
    const userAlreadyExists = await userRepository.findOne({
      email,
    });
  
    if (userAlreadyExists) {
      return incorrectData('Usuário já cadastrado. Dado')
    }
  
    const passwordHash = await hash(password, 8);
  
    const user = await userRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });
  
    await userRepository.save(user);
    return success(user)
  } catch (error) {
    console.log(error)
    return serverError()
  }
 
 
};
