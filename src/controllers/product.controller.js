import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";
import { Errors } from "../errors.js";
import ProductService from "../services/product.service.js";
import { config } from "../config.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  static getById = async (req, res) => {
    try {
      const { pId } = req.params;
      const product = await this.productService.getById(pId);
      if (!product)
        response(res, HttpStatus.NOT_FOUND, Errors.notFound("Product"));
      else response(res, HttpStatus.OK, { product });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static getAllProducts = async (req, res, next) => {
    try {
      const { page, limit, query, sort, available } = req.query;
      console.log(sort);
      const resp = await this.productService.getAllProducts(
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

  static createProduct = async (req, res) => {
    try {
      const product = await this.productService.createProduct(req.body);
      response(res, HttpStatus.CREATED, { product }, false);
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const { pId } = req.params;
      const productUpd = await this.productService.updateProduct(pId, req.body);

      if (!productUpd) {
        response(res, HttpStatus.NOT_FOUND, { msg: "Error updating product" });
      } else {
        response(res, HttpStatus.OK, { productUpd });
      }
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const { idProduct } = req.params;
      const wasDeleted = await this.productService.deleteProduct(idProduct);
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
}
