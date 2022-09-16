import AppDataSource from "../../data-source"
import { ClubsEntity } from "../../entities/clubs.entity"
import { UsersEntity } from "../../entities/users.entity"
import { UsersClubsEntity } from "../../entities/user_club.entity"
import { AppError } from "../../errors/appError"


const exitClubService = async (userId: string, clubId: string) => {

    const userRepository = AppDataSource.getRepository(UsersEntity);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    const clubRepository = AppDataSource.getRepository(ClubsEntity)
    const club = await clubRepository.findOneBy({id: clubId})

    if (!club) {
        throw new AppError(404, "Club not found");
    }

    const usersClubsRepository = AppDataSource.getRepository(UsersClubsEntity);

    const usersInClub = await usersClubsRepository.find();
    const userExistsInClub = usersInClub.find((usersClubs) =>
          usersClubs.user.id === userId && usersClubs.club.id === clubId
    );
    
      if (!userExistsInClub) {
        throw new AppError(400, "User was not found in this club");
      }

    await usersClubsRepository
    .createQueryBuilder()
    .delete()
    .from(UsersClubsEntity)
    .where("user = :id", { id: userId })
    .execute()


    return "User left the club"

}

export default exitClubService
