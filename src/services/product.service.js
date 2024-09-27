import { getDAOFromConfig } from "../dao/gateway.js";
import Services from "./class.services.js";
import { transporterGmail } from "./email.service.js";

export default class ProductService extends Services {
  constructor() {
    const dao = getDAOFromConfig().product;
    const cartDao = getDAOFromConfig().cart;
    const userDao = getDAOFromConfig().user;
    super(dao);
    this.dao = dao;
    this.cartDao = cartDao;
    this.userDao = userDao;
  }

  getAllProducts = async (page, limit, query, sort, available) => {
    try {
      return await this.dao.getAllProducts(page, limit, query, sort, available);
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product) => {
    try {
      return await this.dao.createProduct(product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateProduct = async (pId, product) => {
    try {
      return await this.dao.updateProduct(pId, product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateStock = async (idProd, quantityToAdd) => {
    try {
      const product = await this.dao.getById(idProd);
      if (!product) {
        console.log("Error: The product not exist");
        return null;
      }

      product.stock += quantityToAdd;
      await this.updateProduct(idProd, product);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteProduct = async (pId) => {
    try {
      const auxCarts = await this.cartDao.getAllCarts();
      const auxUsers = await this.userDao.getAll();
      let foundCart;
      let user;

      foundCart = auxCarts.find((cart) =>
        cart.items.some((ci) => ci.product._id.toString() === pId)
      );

      if (foundCart) {
        user = auxUsers.find(
          (u) => u.cart._id.toString() === foundCart._id.toString()
        );
      }

      if (user && user.isPremium) {
        // mando email
        this.sendUserGmail(user.email);
      }

      // Eliminamos el producto
      return await this.dao.deleteProduct(pId);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  sendUserGmail = async (email) => {
    const gmailOptions = {
      from: process.env.EMAIL_GMAIL,
      to: email,
      subject: "The product was deleted",
      //html: template(name),
    };
    await transporterGmail.sendMail(gmailOptions);
  };
}
