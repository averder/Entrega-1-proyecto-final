import { getDAOFromConfig } from "../dao/gateway.js";

const getProductById = async (pId) => {
  try {
    const dao = getDAOFromConfig().product;
    return await dao.getProductById(pId);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProducts = async (page, limit, query, sort, available) => {
  try {
    const dao = getDAOFromConfig().product;
    return await dao.getAllProducts(page, limit, query, sort, available);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (product) => {
  try {
    const dao = getDAOFromConfig().product;
    return await dao.createProduct(product);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProduct = async (pId, product) => {
  try {
    const dao = getDAOFromConfig().product;
    return await dao.updateProduct(pId, product);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteProduct = async (pId) => {
  try {
    const dao = getDAOFromConfig().product;
    return await productService.deleteProduct(pId);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const productService = {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
