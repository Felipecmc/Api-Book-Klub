import {Request, Response} from "express";
import { AppError, handleError } from "../../errors/appError";
import clubListByIdService from "../../services/clubs/clubListById.service";


const clubLisByIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const club = await clubListByIdService(id)

        return res.status(200).json(club);
    }  catch (error: any) {
        handleError(error, res);
      }
}

export default clubLisByIdController;