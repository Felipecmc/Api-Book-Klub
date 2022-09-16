import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import clubMeetingsService from "../../services/clubs/clubMeetings.service";
import { IMeetingRequest } from "../../interfaces/meetings";

const ClubMeetingController = async (req: Request, res: Response) => {
  try {
      const clubId = req.params.id;
      const {date,hour, description} =req.body
      const meeting = await clubMeetingsService(clubId, date, hour, description);

      return res.status(201).send(meeting);
  } catch (error: any) {
    handleError(error, res);
  }
};
export default ClubMeetingController;