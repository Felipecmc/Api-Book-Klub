import AppDataSource from "../../data-source";
import { MeetingsEntity } from "../../entities/meetings.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { AppError } from "../../errors/appError";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { UsersEntity } from "../../entities/users.entity";
import { sendEmail } from "../../utils";
import { emailMessage } from "../../utils/email.message";

const clubMeetingsService = async (
  clubId: string,
  date: string,
  hour: string,
  description: string
) => {
  const meetingsRepository = AppDataSource.getRepository(MeetingsEntity);
  const clubRepository = AppDataSource.getRepository(ClubsEntity);

  if (!date || !hour || !description) {
    throw new AppError(
      401,
      "Missing properties, date, hour and description must be sent."
    );
  }

  const clubFind = await clubRepository.find();
  const clubIdd = clubFind.find((club) => club.id === clubId);

  if (!clubIdd) {
    throw new AppError(400, "Club not found");
  }

  const newMeeting = meetingsRepository.create({
    club: clubIdd,
    date,
    hour,
    description,
  });

  await meetingsRepository.save(newMeeting);

  const clubUsers = await clubRepository
    .createQueryBuilder()
    .select(["users.email"])
    .from(UsersClubsEntity, "usc")
    .innerJoin(UsersEntity, "users", 'users."id" = usc."userId"')
    .where('usc."clubId" = :id', { id: clubId })
    .groupBy("users.id")
    .getRawMany();

  const users: any = [];

  const emailSubject = `Uma nova reunião foi agenda no clube ${clubIdd.name}`;

  clubUsers.forEach((userEmail) => users.push(userEmail.users_email));

  const subject = emailSubject;
  const text = emailMessage(clubIdd.name, date, hour, description);
  const to = users.join();

  await sendEmail({ subject, text, to });

  return newMeeting;
};

export default clubMeetingsService;
