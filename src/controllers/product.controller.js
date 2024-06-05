import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";
import { Errors } from "../errors.js";
import { productService } from "../services/product.service.js";
import { config } from "../config.js";

const getProductById = async (req, res) => {
  try {
    const { pId } = req.params;
    const product = await productService.getProductById(pId);
    if (!product)
      response(res, HttpStatus.NOT_FOUND, Errors.notFound("Product"));
    else response(res, HttpStatus.OK, { product });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, query, sort, available } = req.query;
    console.log(sort);
    const resp = await productService.getAllProducts(
      page,
      limit,
      query,
      sort,
      available
    );
    const next = resp.hasNextPage
      ? `http://localhost:${config.PORT}/products?limit=${limit}&page=${resp.nextPage}&sort=${sort}&query=${query}&available=${available}`
      : null;
    const prev = resp.hasPrevPage
      ? `http://localhost:${config.PORT}/products?limit=${limit}&page=${resp.prevPage}&sort=${sort}&query=${query}&available=${available}`
      : null;
    const products = {
      payload: resp.docs,
      info: {
        count: resp.totalDocs,
        totalPages: resp.totalPages,
        nextLink: next,
        prevLink: prev,
        hasPrevPage: resp.hasPrevPage,
        hasNextPage: resp.hasNextPage,
      },
    };
    if (!products)
      response(res, HttpStatus.NOT_FOUND, Errors.notFound("Product"));
    else
      response(res, HttpStatus.OK, {
        status: "success",
        payload: products.payload,
        info: products.info,
      });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    response(res, HttpStatus.CREATED, { product }, false);
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pId } = req.params;
    const productUpd = await productService.updateProduct(pId, req.body);

    if (!productUpd) {
      response(res, HttpStatus.NOT_FOUND, { msg: "Error updating product" });
    } else {
      response(res, HttpStatus.OK, { productUpd });
    }
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const wasDeleted = await productService.deleteProduct(idProduct);
    if (!wasDeleted) {
      response(res, HttpStatus.NOT_FOUND, "Error delete product");
    } else {
      response(
        res,
        HttpStatus.OK,
        `Product id: ${idProduct} deleted successfully`
      );
    }
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const controller = {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
