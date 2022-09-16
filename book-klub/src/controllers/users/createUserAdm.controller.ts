import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import { instanceToPlain } from "class-transformer";
import createUserAdmService from "../../services/users/createUserAdm.service";

const createUserAdmController = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdm, password } = req.body;
    const user = await createUserAdmService({ name, email, isAdm, password });

    return res.status(201).json(instanceToPlain(user));
  } catch (error: any) {
    handleError(error, res);
  }
};

export default createUserAdmController;
