import { Router } from "express";
import clubBookEntryController from "../controllers/clubs/clubBooksEntry.controller";
import ClubEntryController from "../controllers/clubs/clubEntry.controller";
import clubListByIdController from "../controllers/clubs/clubListById.controller.";

import clubsListController from "../controllers/clubs/clubsList.controller";
import ClubUserListController from "../controllers/clubs/clubUserList.controller";
import createClubController from "../controllers/clubs/createClub.controller";
import deleteClubController from "../controllers/clubs/deleteClub.controller";
import updateClubController from "../controllers/clubs/updateClub.controller";
import AuthMiddlewares from "../middlewares/auth.middleware";
import clubsListMeetingsController from "../controllers/clubs/clubsListMeetings.controller";
import ClubMeetingController from "../controllers/clubs/clubMeetings.controller";
import exitClubController from "../controllers/clubs/exitClub.controller";
import clubAdmMiddlleware from "../middlewares/clubAdm.middleware";

const clubRouter = Router();

clubRouter.post("", AuthMiddlewares, createClubController);
clubRouter.post(
  "/:id/meetings",
  AuthMiddlewares,
  clubAdmMiddlleware,
  ClubMeetingController
);
clubRouter.post("/:id/entry", AuthMiddlewares, ClubEntryController);
clubRouter.post(
  "/:id/book",
  AuthMiddlewares,
  clubAdmMiddlleware,
  clubBookEntryController
);
clubRouter.get("", clubsListController);
clubRouter.get("/:id", clubListByIdController);
clubRouter.get("/:id/meetings", clubsListMeetingsController);
clubRouter.get("/:id/users", AuthMiddlewares, ClubUserListController);
clubRouter.patch(
  "/:id",
  AuthMiddlewares,
  clubAdmMiddlleware,
  updateClubController
);
clubRouter.delete(
  "/:id",
  AuthMiddlewares,
  clubAdmMiddlleware,
  deleteClubController
);
clubRouter.delete("/:id/exit", AuthMiddlewares, exitClubController);

export default clubRouter;
