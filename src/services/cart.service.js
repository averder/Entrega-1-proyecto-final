import { getDAOFromConfig } from "../dao/gateway.js";

const dao = getDAOFromConfig().cart;

const createCart = async () => {
  try {
    console.log(dao);
    return await dao.createCart({
      items: [],
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addProductToCart = async (idCart, idProd) => {
  try {
    const cart = await dao.getCartById(idCart);
    if (!cart) {
      console.log("Error: The cart not exist");
      return null;
    }

    const auxCart = cart;

    let cartItem = (auxCart.items.filter(
      (ci) => ci.product._id.toString() === idProd
    ) || [null])[0];

    if (!cartItem) {
      cartItem = { product: idProd, quantity: 1 };
      auxCart.items = [...auxCart.items, cartItem];
    }

    cartItem.quantity++;

    await dao.updateCart(cart._id, { product: idProd, items: auxCart.items });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeProductFromCart = async (idCart, idProd) => {
  try {
    const cart = await dao.getCartById(idCart);
    if (!cart) {
      console.log("Error: The cart not exist");
      return null;
    }
    const auxCart = cart;
    const items = auxCart.items.filter(
      (ci) => ci.product.toString() !== idProd
    );
    await dao.updateCart(cart._id, { product: idProd, items });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeAllFromCart = async (idCart) => {
  try {
    const cart = await dao.getCartById(idCart);
    if (!cart) {
      console.log("Error: The cart not exist");
      return null;
    }
    await dao.updateCart(cart._id, { _id: cart._id, items: [] });
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getCartById = async (idCart) => {
  try {
    return await dao.getCartById(idCart);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllCarts = async () => {
  try {
    return await dao.getAllCarts();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProducts = async (idCart, products) => {
  try {
    let cart = await dao.getCartById(idCart);
    if (!cart) {
      console.log("Error: The cart not exist");
      return null;
    }
    await dao.updateCart(cart._id, products);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateQuantity = async (idCart, idProd, quantity) => {
  try {
    const cart = await dao.getCartById(idCart);
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

    await dao.updateCart(cart._id, { product: idProd, items: auxCart.items });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const cartService = {
  createCart,
  addProductToCart,
  getCartById,
  getAllCarts,
  removeProductFromCart,
  removeAllFromCart,
  updateQuantity,
  updateProducts,
};
