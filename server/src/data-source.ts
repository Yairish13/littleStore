import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User.entity";
import { Product } from "./entity/Product.entity";
import { Order } from "./entity/Order.entity";
import { OrderProduct } from "./entity/OrderProducts.entity";

dotenv.config();

const {
  POSTGRES_HOST = 'postgres',
  POSTGRES_USER = 'postgres',
  POSTGRES_PASSWORD,
  POSTGRES_DB = 'store'
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: process.env.NODE_ENV === "dev" ? false : false,
  entities: [User, Product, Order, OrderProduct],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
