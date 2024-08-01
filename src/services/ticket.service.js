import Services from "./cart.service.js";
import CartServices from "./cart.service.js";
import ProductService from "./product.service.js";
import { getDAOFromConfig } from "../dao/gateway.js";

import { v4 as uuidv4 } from "uuid";

const prodService = new ProductService();
const cartService = new CartServices();

export default class TicketService extends Services {
  constructor() {
    const dao = getDAOFromConfig().ticket;
    super(dao);
    this.dao = dao;
  }

  async generateTicket(user) {
    try {
      const { id } = user.cart;
      const cart = await cartService.getCartById(id); //getById
      if (!cart) return null;
      let amountAcc = 0;
      for (const item of cart.items) {
        const idProd = item.product._id;
        const prodDB = await prodService.getById(idProd);
        if (item.quantity <= prodDB.stock) {
          const amount = item.quantity * prodDB.price;
          amountAcc += amount;
          await prodService.updateStock(idProd, -item.quantity);
        } else return null;
      }

      const ticket = await this.dao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });

      await cartService.clearCart(user.cart);
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
