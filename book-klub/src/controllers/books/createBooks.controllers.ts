import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { handleError } from "../../errors/appError";
import createBooksService from "../../services/books/createBooks.service";

const createBooksController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const book = await createBooksService(data);

    return res.status(201).json(book);
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default createBooksController;
