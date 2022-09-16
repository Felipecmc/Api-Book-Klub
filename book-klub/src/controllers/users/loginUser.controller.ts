import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import loginUserService from "../../services/users/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Missing e-mail or password",
      });
    }

    const token = await loginUserService({ email, password });

    return res.status(200).json(token);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default loginUserController;
