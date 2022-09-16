import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsersEntity } from "../../entities/users.entity";
import { IUserLogin } from "../../interfaces/users";

const loginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(UsersEntity);

  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError(403, "Invalid email or password");
  }

  if (user.isActive === false) {
    throw new AppError(400, "User is not active");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(403, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      email: user.email,
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  const responseObj = {
    token,
    id: user.id,
  };

  return responseObj;
};

export default loginUserService;
