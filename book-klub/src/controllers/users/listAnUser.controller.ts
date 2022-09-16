import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListAnUsersService from "../../services/users/listAnUser.service";
import { instanceToPlain } from "class-transformer";

const ListAnUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const User = await ListAnUsersService(id);

    return res.status(200).json(instanceToPlain(User));
  } catch (error: any) {
    handleError(error, res);
  }
};

export default ListAnUserController;
