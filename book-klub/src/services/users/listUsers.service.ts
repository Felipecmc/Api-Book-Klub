import AppDataSource from "../../data-source";
import { UsersEntity } from "../../entities/users.entity";

const ListUsersService = async () => {
  const UserRepository = AppDataSource.getRepository(UsersEntity);
  return await UserRepository.find();
};
export default ListUsersService;
