import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";

const clubsListService = async () => {
  const clubsRepository = AppDataSource.getRepository(ClubsEntity);

  const clubs = await clubsRepository.find();

  if (!clubs) {
    throw new AppError(404, "Clubs not found");
  }

  const clubList = await clubsRepository
    .createQueryBuilder()
    .select("club")
    .from(UsersClubsEntity, "usc")
    .innerJoin(ClubsEntity, "club", 'club."id" = usc."clubId"')
    .groupBy("club.id")
    .getRawMany();

  return clubList;
};

export default clubsListService;
