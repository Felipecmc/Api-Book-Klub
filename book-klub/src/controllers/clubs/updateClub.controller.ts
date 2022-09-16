import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import UpdateClubService from "../../services/clubs/updateClub.service";

const updateClubController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {name,description} = req.body

    const club = await UpdateClubService(id, name, description);
    
    return res.status(200).json(club);
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default updateClubController;
