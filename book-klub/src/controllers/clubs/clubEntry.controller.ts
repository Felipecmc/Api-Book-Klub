import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ClubEntryService from "../../services/clubs/clubEntry.service";

const ClubEntryController = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.id;
    const userId = req.body.id;

    const userEnteredClub = await ClubEntryService(userId, clubId);

    return res.status(201).send({
      message: userEnteredClub,
    });
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default ClubEntryController;
