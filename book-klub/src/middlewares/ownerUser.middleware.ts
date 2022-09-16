import { Request, Response, NextFunction } from "express";

const OwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const idUser = req.body.id;

  if (id !== idUser) {
    return res.status(403).json({
      staus: "error",
      statusCode: 403,
      message: "Not an owner",
    });
  }

  next();
};

export default OwnerMiddleware;
