import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { ClubsEntity } from "../entities/clubs.entity";
import { AppError } from "../errors/appError";

const clubAdmMiddlleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.id;
  const clubId = req.params.id;

  const clubRepository = AppDataSource.getRepository(ClubsEntity);

  const club = await clubRepository.find({
    where: {
      id: clubId,
    },
  });

  if (club.length === 0) {
    return res.status(404).send({
      staus: "error",
      statusCode: 404,
      message: "Club not found",
    });
  }

  if (userId !== club[0].adm.id) {
    return res.status(403).send({
      staus: "error",
      statusCode: 403,
      message: "You need to be the club`s adm in order to have this access",
    });
  }

  next();
};

export default clubAdmMiddlleware;
