import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listUserClubsService from "../../services/users/listUserClubs.service";
import { instanceToPlain } from "class-transformer";

const listUserClubsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await listUserClubsService(id);

    return res.status(200).json(instanceToPlain(user));
  } catch (error: any) {
    handleError(error, res);
  }
};

export default listUserClubsController;
