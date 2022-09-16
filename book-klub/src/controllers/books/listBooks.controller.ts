import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listBooksService from "../../services/books/listBooks.service";

const listBooksController = async (req: Request, res: Response) => {
  try {
    const book= await listBooksService();
    return res.status(200).json(book);
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default listBooksController;