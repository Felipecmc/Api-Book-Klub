import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import exitClubService from "../../services/clubs/exitClub.service";

const exitClubController = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.id;
    const userId = req.body.id;

    const userExitedClub = await exitClubService(userId, clubId);

    return res.status(204).send({
      message: userExitedClub,
    });
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default exitClubController;