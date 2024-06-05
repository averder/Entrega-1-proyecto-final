import { HttpStatus } from "../constants.js";
import { Errors } from "../errors.js";
import { response } from "../helpers.js";
//import * as cartService from "../services/cart.service.js"
import { cartService } from "../services/cart.service.js";

const createCart = async (req, res) => {
  try {
    let { cart } = req.body;
    const created = await cartService.createCart(cart);
    response(res, HttpStatus.CREATED, created, false);
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { idCart, idProd } = req.params;
    const cart = await cartService.addProductToCart(idCart, idProd);
    response(res, HttpStatus.CREATED, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { idCart, idProd } = req.params;
    const cart = await cartService.removeProductFromCart(idCart, idProd);
    response(res, HttpStatus.CREATED, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const removeAllFromCart = async (req, res) => {
  try {
    const { idCart } = req.params;
    const cart = await cartService.removeAllFromCart(idCart);
    response(res, HttpStatus.CREATED, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getCartById = async (req, res) => {
  try {
    const { idCart } = req.params;
    return await cartService.getCartById(idCart);
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    response(res, HttpStatus.CREATED, { carts }, false);
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { idCart, idProd } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateQuantity(idCart, idProd, quantity);
    response(res, HttpStatus.CREATED, { cart });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {
  createCart,
  addProductToCart,
  getCartById,
  getAllCarts,
  removeProductFromCart,
  removeAllFromCart,
  updateQuantity,
};
