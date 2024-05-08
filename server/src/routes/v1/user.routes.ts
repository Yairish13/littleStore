import * as express from "express";
import { UserController } from "../../controllers/users.controller";
import { authorization } from "../../middlewares/authorization.middleware";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
const Router = express.Router();

Router.get(
  "/",
  currentUser,
  requireAuth,
  authorization(["user","admin"]),
  UserController.getUsers
);

Router.post("/signup", UserController.signup);
Router.post(
  "/update/:id",
  currentUser,
  requireAuth,
  authorization(["user", "admin"]),
  UserController.updateUser
);
Router.delete(
  "/delete/:id",
  currentUser,
  requireAuth,
  authorization(["admin"]),
  UserController.deleteUser
);
export { Router as userRouter };
