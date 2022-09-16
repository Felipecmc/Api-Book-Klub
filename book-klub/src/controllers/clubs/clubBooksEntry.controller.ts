import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import clubBookEntryService from "../../services/clubs/clubBookEntry.service";

const clubBookEntryController = async (req: Request, res: Response) => {
  try {
    const bookId = req.body.bookId;
    const { id } = req.params;

    const clubBook = await clubBookEntryService(id, bookId);

    res.status(200).json(clubBook);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default clubBookEntryController;
