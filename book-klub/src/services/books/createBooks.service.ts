import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { CategoriesEntity } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { IbookRequest } from "../../interfaces/books";

const createBooksService = async (data: IbookRequest) => {
  const booksRepository = AppDataSource.getRepository(BooksEntity);
  const categoryRepository = AppDataSource.getRepository(CategoriesEntity);

  if (!data.name) {
    throw new AppError(400, "Name is required!");
  }

  if (!data.author) {
    throw new AppError(400, "Author is required!");
  }

  if (!data.categoryId) {
    throw new AppError(400, "CategoryId is required!");
  }

  const categories = await categoryRepository.find();
  const category = categories.find((el) => el.id === data.categoryId);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const books = await booksRepository.find();
  const bookExists = books.some(
    (el) => el.name === data.name && el.author == data.author
  );

  if (bookExists) {
    throw new AppError(400, "Book already exists.");
  }

  const newBook = booksRepository.create({
    name: data.name,
    author: data.author,
    category: category,
  });

  const res = await booksRepository.save(newBook);

  return res;
};

export default createBooksService;
