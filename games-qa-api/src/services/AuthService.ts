import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";

interface IAuthRequest {
  email: string;
  password: string;
}

export const authService = async ({ email, password }: IAuthRequest) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ email });

  if (!user) {
    throw new Error("Email/Password invalid!");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Email/Password invalid!");
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

  return token;
};
