import { config } from "../config.js";
import { ProductMongoDAO } from "../dao/mongodb/product.dao.js";
import { CartMongoDAO } from "../dao/mongodb/cart.dao.js";
import { mongoInit } from "../dao/mongodb/connection.js";
import { UserMongoDAO } from "./mongodb/user.dao.js";

export const getDAOFromConfig = () => {
  switch (process.env.DATABASE_ENGINE) {
    case "mongo":
      return {
        product: ProductMongoDAO,
        cart: CartMongoDAO,
        user: UserMongoDAO,
        initConnection: mongoInit,
      };
    default:
      break;
  }
};
