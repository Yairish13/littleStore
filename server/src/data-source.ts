import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User.entity";
import { Product } from "./entity/Product.entity";
import { Order } from "./entity/Order.entity";
import { OrderProduct } from "./entity/OrderProducts.entity";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5433"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Product, Order, OrderProduct],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  
});
