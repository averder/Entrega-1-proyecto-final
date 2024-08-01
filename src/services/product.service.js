import { getDAOFromConfig } from "../dao/gateway.js";
import Services from "./class.services.js";

export default class ProductService extends Services {
  constructor() {
    const dao = getDAOFromConfig().product;
    super(dao);
    this.dao = dao;
  }

  getAllProducts = async (page, limit, query, sort, available) => {
    try {
      return await this.dao.getAllProducts(page, limit, query, sort, available);
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product) => {
    try {
      return await this.dao.createProduct(product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateProduct = async (pId, product) => {
    try {
      return await this.dao.updateProduct(pId, product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateStock = async (idProd, quantityToAdd) => {
    try {
      const product = await this.dao.getById(idProd);
      if (!product) {
        console.log("Error: The product not exist");
        return null;
      }

      product.stock += quantityToAdd;
      await this.updateProduct(idProd, product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteProduct = async (pId) => {
    try {
      return await this.dao.deleteProduct(pId);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
