import * as express from "express";
import { authorization } from "../../middlewares/authorization.middleware";
import { AuthController } from "../../controllers/auth.controller";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
const Router = express.Router();


Router.get(
  "/profile",
  currentUser,
  requireAuth,
  authorization(["user", "admin"]),
  AuthController.getProfile
);
Router.post("/login", AuthController.login);
Router.post("/logout", AuthController.logout);

export { Router as authRouter };
