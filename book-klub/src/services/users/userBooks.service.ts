import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ClubBookEntity } from "../../entities/club_book.entity";
import { UsersEntity } from "../../entities/users.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const booksUserService = async (id: string) => {
  const bookRepository = AppDataSource.getRepository(BooksEntity);
  const userRepository = AppDataSource.getRepository(UsersEntity);

  const userAlready = await userRepository.findOneBy({ id: id });

  if (!userAlready) {
    throw new AppError(404, "User not found");
  }

  const books = await bookRepository
    .createQueryBuilder()
    .select("b")
    .from(UsersClubsEntity, "usc")
    .innerJoin(ClubsEntity, "c", 'c."id" = usc."clubId"')
    .innerJoin(ClubBookEntity, "cb", 'cb."clubId" = usc."clubId"')
    .innerJoin(BooksEntity, "b", 'b.id = cb."bookId"')
    .where('usc."userId" = :id', { id: id })
    .groupBy("b.id")
    .getRawMany();

  return books;
};

export default booksUserService;
