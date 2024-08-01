import { getDAOFromConfig } from "../dao/gateway.js";
import Services from "./class.services.js";

export default class CartService extends Services {
  constructor() {
    const dao = getDAOFromConfig().cart;
    super(dao);
    this.dao = dao;
  }

  createCart = async () => {
    try {
      return await this.dao.createCart({
        items: [],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addProductToCart = async (cart, idProd) => {
    try {
      if (!cart) {
        console.log("Error: The cart not exist");
        return null;
      }
      if (!idProd) {
        console.log("Error: The product id not exist");
        return null;
      }
      const auxCart = cart;

      let cartItem = (auxCart.items.filter(
        (ci) => ci.product.toString() === idProd
      ) || [null])[0];

      if (!cartItem) {
        cartItem = { product: idProd, quantity: 0 };
        auxCart.items = [...auxCart.items, cartItem];
      }

      cartItem.quantity++;
      await this.dao.updateCart(cart._id, {
        product: idProd,
        items: auxCart.items,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  removeProductFromCart = async (idCart, idProd) => {
    try {
      const cart = await this.dao.getCartById(idCart);
      if (!cart) {
        console.log("Error: The cart not exist");
        return null;
      }
      const auxCart = cart;
      const items = auxCart.items.filter(
        (ci) => ci.product.toString() !== idProd
      );
      await this.dao.updateCart(cart._id, { product: idProd, items });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  removeAllFromCart = async (idCart) => {
    try {
      const cart = await this.dao.getCartById(idCart);
      if (!cart) {
        console.log("Error: The cart not exist");
        return null;
      }
      await this.dao.updateCart(cart._id, { _id: cart._id, items: [] });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getCartById = async (idCart) => {
    try {
      return await this.dao.getCartById(idCart);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getAllCarts = async () => {
    try {
      return await this.dao.getAllCarts();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateProducts = async (idCart, products) => {
    try {
      let cart = await this.dao.getCartById(idCart);
      if (!cart) {
        console.log("Error: The cart not exist");
        return null;
      }
      await this.dao.updateCart(cart._id, products);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateQuantity = async (idCart, idProd, quantity) => {
    try {
      const cart = await this.dao.getCartById(idCart);
      if (!cart) {
        console.log("Error: The cart not exist");
        return null;
      }

      const auxCart = cart;

      let cartItem = (auxCart.items.filter(
        (ci) => ci.product._id.toString() === idProd
      ) || [null])[0];

      if (cartItem) {
        cartItem.quantity = quantity;
      }

      await this.dao.updateCart(cart._id, {
        product: idProd,
        items: auxCart.items,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  clearCart = async (cart) => {
    try {
      await this.dao.updateCart(cart._id, {
        _id: cart._id,
        items: [],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
