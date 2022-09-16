import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const UpdateClubService = async (
  id: string,
  name: string,
  description: string
): Promise<ClubsEntity> => {
  const clubRepository = AppDataSource.getRepository(ClubsEntity);

  const club = await clubRepository.findOneBy({ id: id });

  const getSameNameClub = await clubRepository.findOneBy({ name: name });

  if (!club) {
    throw new AppError(400, "Club not found");
  }

  if (getSameNameClub) {
    throw new AppError(
      403,
      "There is already a club with this name, choose a different club name"
    );
  }

  await clubRepository.update(id, {
    name,
    description,
  });

  const updatedClub: any = await clubRepository
    .createQueryBuilder()
    .select("club")
    .from(UsersClubsEntity, "usc")
    .innerJoin(ClubsEntity, "club", 'club."id" = usc."clubId"')
    .where('usc."clubId" = :id', { id: id })
    .groupBy("club.id")
    .getRawMany();

  return updatedClub[0];
};

export default UpdateClubService;
