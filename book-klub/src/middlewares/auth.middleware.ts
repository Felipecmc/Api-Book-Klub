import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

const AuthMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        staus: "error",
        statusCode: 401,
        message: "Missing authorization headers.",
      });
    }

    token = token.split(" ")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          return res.status(401).send({
            staus: "error",
            statusCode: 401,
            message: "Invalid token.",
          });
        }

        (req.body["isAdm"] = decoded.isAdm), (req.body["id"] = decoded.sub);

        next();
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default AuthMiddlewares;
