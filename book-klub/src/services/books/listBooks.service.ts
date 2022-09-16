import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";

const listBooksService = async():Promise<BooksEntity[]> => {

    const booksRepository = AppDataSource.getRepository(BooksEntity);
    const booksList = await booksRepository.find();
    
    return booksList;
};
export default listBooksService;