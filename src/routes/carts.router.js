import { Router } from "express";
import CartsManager from "../manager/carts-manager.service.js";
import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";
import { Errors } from "../errors.js";

const router = Router();

const cartManager = new CartsManager("/data/carts.json");

router.post("/", async (req, res) => {
  try {
    let { cart } = req.body;
    await cartManager.createCart(cart);
    response(res, HttpStatus.CREATED, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

router.post("/:idCart/product/:idProd", async (req, res) => {
  try {
    const { idCart, idProd } = req.params;
    const cart = await cartManager.addProductToCart(idCart, idProd);
    response(res, HttpStatus.CREATED, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

router.get("/:idCart", async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartManager.getCart(idCart);
    if (!cart) {
      response(res, HttpStatus.NOT_FOUND, Errors.notFound("Cart"));
    } else response(res, HttpStatus.OK, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

export default router;
