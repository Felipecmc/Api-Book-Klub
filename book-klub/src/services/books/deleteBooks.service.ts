import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { AppError } from "../../errors/appError";

const deleteBooksService = async(id: string)=>{
    const booksRepository = AppDataSource.getRepository(BooksEntity);
    
    const book = await booksRepository.findOneBy({id: id});

    if(!book){
        throw new AppError(400, "Book not found!")
    }

    const bookDeleted = await booksRepository
        .createQueryBuilder()
        .delete()
        .from(BooksEntity)
        .where("id = :id",{id: id})
        .execute()

    return bookDeleted
}

export default deleteBooksService;