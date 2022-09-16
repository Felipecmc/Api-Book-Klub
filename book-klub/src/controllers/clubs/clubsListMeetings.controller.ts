import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import clubsListMeetingsService from "../../services/clubs/clubsListMeetings.service";

const clubsListMeetingsController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const meetinngs = await clubsListMeetingsService(id);
        return res.status(200).json(meetinngs);
    }  catch (error: any) {
        handleError(error, res);
      }
}

export default clubsListMeetingsController