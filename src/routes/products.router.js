import { Router } from "express";
const router = Router();

import ProductManager from "../manager/product-manager.service.js";
import { productsValidator } from "../middleware/productsValidator.js";

import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";
import { Errors } from "../errors.js";

const productManager = new ProductManager("/data/product.json");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    response(res, HttpStatus.OK, { products });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

router.get("/:pId", async (req, res) => {
  try {
    const { pId } = req.params;
    const product = await productManager.getProductById(pId);
    if (!product)
      response(res, HttpStatus.NOT_FOUND, Errors.notFound("Product"));
    else response(res, HttpStatus.OK, { product });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

router.post("/", [productsValidator], async (req, res) => {
  try {
    const product = await productManager.createProduct(req.body);
    response(res, HttpStatus.CREATED, { product });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

router.put("/:pId", async (req, res) => {
  try {
    const { pId } = req.params;
    const productUpd = await productManager.updateProduct(pId, req.body);

    if (!productUpd) {
      // mirar aca bien este if
      response(res, HttpStatus.NOT_FOUND, { msg: "Error updating product" });
    } else {
      response(res, HttpStatus.OK, { productUpd });
    }
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

router.delete("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const wasDeleted = await productManager.deleteProduct(idProduct);
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
});

export default router;
