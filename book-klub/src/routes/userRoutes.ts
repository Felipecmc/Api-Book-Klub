import { Router } from "express";
import loginUserController from "../controllers/users/loginUser.controller";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import ListAnUserController from "../controllers/users/listAnUser.controller";
import ListUsersController from "../controllers/users/listUsers.controller";
import UpdateAnUserController from "../controllers/users/UpdateAnUser.controller";
import AuthMiddlewares from "../middlewares/auth.middleware";
import OwnerMiddleware from "../middlewares/ownerUser.middleware";
import listUserClubsController from "../controllers/users/listUserClubs.controller";
import booksUserController from "../controllers/users/userBooks.controller";
import createUserAdmController from "../controllers/users/createUserAdm.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.post("/adm", createUserAdmController);
userRouter.post("/login", loginUserController);
userRouter.get("", ListUsersController);
userRouter.get("/:id/clubs", AuthMiddlewares, listUserClubsController);
userRouter.get("/:id", AuthMiddlewares, ListAnUserController);
userRouter.patch(
  "/:id",
  AuthMiddlewares,
  OwnerMiddleware,
  UpdateAnUserController
);
userRouter.delete(
  "/:id",
  AuthMiddlewares,
  OwnerMiddleware,
  deleteUserController
);
userRouter.get("/:id/book", booksUserController);

export default userRouter;
