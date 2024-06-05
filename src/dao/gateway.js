import { config } from "../config.js";
import { ProductMongoDAO } from "../dao/mongodb/product.dao.js";
import { CartMongoDAO } from "../dao/mongodb/cart.dao.js";
import { mongoInit } from "../dao/mongodb/connection.js";

export const getDAOFromConfig = () => {
  switch (config.dao) {
    case "mongo":
      return {
        product: ProductMongoDAO,
        cart: CartMongoDAO,
        initConnection: mongoInit,
      };
    default:
      break;
  }
};
