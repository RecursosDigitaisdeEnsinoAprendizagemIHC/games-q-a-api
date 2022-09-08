import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";
import { incorrectData, notFoundError, serverError } from "./helpers copy/erros";
import { success } from "./helpers copy/success";

interface IAuthRequest {
  email: string;
  password: string;
}

export const authService = async ({ email, password }: IAuthRequest): Promise<ServiceResponseInterface> => {
  try {
    const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ email });

  if (!user) {
    return notFoundError('Usuário')
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    return incorrectData('Senha')
  }

  const token = sign(
    {
      email: user.email,
    },
    process.env.AUTH_SECRET,
    {
      subject: user.id.toString(),
    }
  );
    return success(token)
  } catch (error) {
    console.log(error)
    return serverError()
  }
  
};
