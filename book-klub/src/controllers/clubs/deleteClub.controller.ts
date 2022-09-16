import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import deleteclubService from "../../services/clubs/deleteClub.service";

const deleteClubController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteclubService (id);

    return res.status(204).send(result);

  }  catch (error: any) {
    handleError(error, res);
  }
};

export default deleteClubController;