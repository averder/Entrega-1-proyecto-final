import { CartModel } from "./models/cart.model.js";

const addProductToCart = async (cartId, productId) => {
  try {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $push: { product: productId } },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const getCartById = async (id) => {
  try {
    return await CartModel.findById(id);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getAllCarts = async () => {
  try {
    const response = await CartModel.find({});
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const createCart = async (obj) => {
  try {
    return await CartModel.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

const updateQuantity = async (id, obj) => {
  try {
    return await CartModel.findByIdAndUpdate(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

const updateCart = async (id, obj) => {
  try {
    return await CartModel.findByIdAndUpdate(id, obj, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCart = async (id) => {
  try {
    const response = await CartModel.findByIdAndDelete(id);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const CartMongoDAO = {
  addProductToCart,
  getCartById,
  getAllCarts,
  createCart,
  updateCart,
  deleteCart,
  updateQuantity,
};
