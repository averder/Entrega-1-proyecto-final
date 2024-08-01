import { HttpStatus } from "../constants.js";
import { Errors } from "../errors.js";
import { response } from "../helpers.js";
import Controllers from "./class.controller.js";
import CartService from "../services/cart.service.js";

const cartService = new CartService();

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  static createCart = async (req, res) => {
    try {
      let { cart } = req.body;
      const created = await cartService.createCart(cart);
      response(res, HttpStatus.CREATED, created, false);
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static addProductToCart = async (req, res) => {
    try {
      const { idProd } = req.params;
      let { cart } = req.session.profile;
      cart = await cartService.addProductToCart(cart, idProd);
      response(res, HttpStatus.CREATED, { cart });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static removeProductFromCart = async (req, res) => {
    try {
      const { idCart, idProd } = req.params;
      const cart = await cartService.removeProductFromCart(idCart, idProd);
      response(res, HttpStatus.CREATED, { cart });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static removeAllFromCart = async (req, res) => {
    try {
      const { idCart } = req.params;
      const cart = await cartService.removeAllFromCart(idCart);
      response(res, HttpStatus.CREATED, { cart });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static getCartById = async (req, res) => {
    try {
      const { idCart } = req.params;
      const cart = await cartService.getCartById(idCart);
      response(res, HttpStatus.CREATED, { cart });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static getAllCarts = async (req, res) => {
    try {
      const carts = await cartService.getAllCarts();
      response(res, HttpStatus.CREATED, { carts }, false);
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static updateProducts = async (req, res) => {
    try {
      const { idCart } = req.params;
      const productsUpdate = req.body;
      const cart = await cartService.updateProducts(idCart, productsUpdate);
      response(res, HttpStatus.CREATED, { cart });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  static updateQuantity = async (req, res) => {
    try {
      const { idCart, idProd } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateQuantity(idCart, idProd, quantity);
      response(res, HttpStatus.CREATED, { cart });
    } catch (error) {
      response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };
}
