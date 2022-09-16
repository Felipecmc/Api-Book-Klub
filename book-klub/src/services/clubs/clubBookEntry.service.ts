import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ClubBookEntity } from "../../entities/club_book.entity";
import { AppError } from "../../errors/appError";

const clubBookEntryService = async (clubId: string, bookId: string) => {
  const bookRepository = AppDataSource.getRepository(BooksEntity);
  const clubRepository = AppDataSource.getRepository(ClubsEntity);
  const clubBookRepository = AppDataSource.getRepository(ClubBookEntity);

  if (!clubId) {
    throw new AppError(401, "Club Id required!");
  }
  if (!bookId) {
    throw new AppError(401, "Book Id required!");
  }

  const clubAlready = await clubRepository.findOne({
    where: { id: clubId },
  });
  const bookAlready = await bookRepository.findOne({
    where: { id: bookId },
  });

  if (!bookAlready) {
    throw new AppError(404, "Book not found");
  }
  if (!clubAlready) {
    throw new AppError(404, "Club not found");
  }

  const clubBook = await clubBookRepository.find();

  const clubBookAlready = clubBook.find(
    (el) => el.book.id === bookId && el.club.id === clubId
  );

  if (clubBookAlready) {
    throw new AppError(400, "Book already registered in the club");
  }

  const newClubBook = clubBookRepository.create({
    book: bookAlready,
    club: clubAlready,
  });

  const res = await clubBookRepository.save(newClubBook);

  return res;
};

export default clubBookEntryService;
