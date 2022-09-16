import { Request, Response } from "express";
import {AppError, handleError} from "../../errors/appError";
import clubsListService from "../../services/clubs/clubsList.service";

const clubsListController = async (req:Request , res:Response) => {
    try {
        const clubs = await clubsListService()

        return res.status(200).json(clubs)
    } catch (error: any) {
        handleError(error, res);
      }
}

export default clubsListController;