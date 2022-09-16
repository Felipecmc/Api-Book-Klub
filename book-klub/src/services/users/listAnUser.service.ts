import AppDataSource from "../../data-source";
import { UsersEntity } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";

const ListAnUsersService = async (userId: string) => {
  const UserRepository = AppDataSource.getRepository(UsersEntity);
  const UserFind = await UserRepository.findOneBy({ id: userId });

  if (!UserFind) {
    throw new AppError(404, "User not found");
  }

  return UserFind;
};
export default ListAnUsersService;
