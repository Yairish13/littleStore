import * as express from "express";
import { ProductController } from "../../controllers/products.controller";
import { authorization } from "../../middlewares/authorization.middleware";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";

const Router = express.Router();

Router.get(
  "/products",
  ProductController.getAllProducts
);
Router.post(
  "/products",
  currentUser,
  requireAuth,
  authorization(["user","admin"]),
  ProductController.createProduct
);

Router.post(
  "/update/:id",
  currentUser,
  requireAuth,
  authorization(["user","admin"]),
  ProductController.updateProduct
);
Router.post(
  "/delete/:id",
  currentUser,
  requireAuth,
  authorization(["user","admin"]),
  ProductController.deleteProduct
);
export { Router as productsRouter };