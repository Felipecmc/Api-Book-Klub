import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IUser, IUserAdmRequest } from "../../interfaces/users";

import { hash } from "bcryptjs";
import { UsersEntity } from "../../entities/users.entity";

async function createUserAdmService(userData: IUserAdmRequest) {
  const userRepository = AppDataSource.getRepository(UsersEntity);

  const emailAlreadyExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (!userData.isAdm) {
    throw new AppError(401, "Must have isAdm property equals true");
  }

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already in use");
  }

  const hashedPassword = await hash(userData.password, 10);

  const newUser = userRepository.create({
    ...userData,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  return newUser;
}

export default createUserAdmService;
