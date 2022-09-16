import { Request, Response, NextFunction } from "express";

const admMiddlleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adm = req.body.isAdm;

  if (adm === false) {
    return res.status(401).send({
      staus: "error",
      statusCode: 401,
      message: "Only the app admin can perform this action",
    });
  }
  next();
};

export default admMiddlleware;
