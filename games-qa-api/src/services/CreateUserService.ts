import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository";

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
}: IUserRequest) => {
  const userRepository = getCustomRepository(UserRepository);

  if (!email) {
    throw new Error("Incorrect email");
  }

  const userAlreadyExists = await userRepository.findOne({
    email,
  });

  if (userAlreadyExists) {
    throw new Error("User already exists");
  }

  const passwordHash = await hash(password, 8);

  const user = await userRepository.create({
    name,
    email,
    password: passwordHash,
    admin,
  });

  await userRepository.save(user);

  return user;
};
