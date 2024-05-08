import * as express from "express";
import { authorization } from "../../middlewares/authorization.middleware";
import { requireAuth } from "../../middlewares/require-auth";
import { orderController } from "../../controllers/order.controller";
import { currentUser } from "../../middlewares/current-user";

const Router = express.Router();

Router.post(
  "/addProduct",
  currentUser,
  requireAuth,
  authorization(["user","admin"]),
  orderController.associateProductToUser
);
Router.get(
  "/products/:userId",
  currentUser,
  requireAuth,
  authorization(["user","admin"]),
  orderController.getAllProductsForUser
);
export { Router as ordersRouter };