import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const clubListByIdService = async (id: string) => {
  const clubRepository = AppDataSource.getRepository(ClubsEntity);

  const club = await clubRepository.findOne({
    where: { id: id },
  });

  if (!club) {
    throw new AppError(404, "Club not found!");
  }

  const clubInfo = await clubRepository
    .createQueryBuilder()
    .select("club")
    .from(UsersClubsEntity, "usc")
    .innerJoin(ClubsEntity, "club", 'club."id" = usc."clubId"')
    .where('usc."clubId" = :id', { id: id })
    .groupBy("club.id")
    .getRawMany();

  return clubInfo[0];
};

export default clubListByIdService;
