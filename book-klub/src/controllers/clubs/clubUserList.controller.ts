import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ClubUserListService from "../../services/clubs/clubUserList.service";

const ClubUserListController = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.id;

    const usersInClub = await ClubUserListService(clubId);

    return res.status(200).send(usersInClub);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default ClubUserListController;
