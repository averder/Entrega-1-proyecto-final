import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartsManager {
  constructor(path) {
    const basePath = "./src/";
    this.path = basePath + path;
    console.log("entro: " + this.path);
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      }
      const carts = await fs.promises.readFile(this.path, "utf8"); // en la lectura lo tengo en formato json
      return JSON.parse(carts); // lo pasa a javascript
    } catch (error) {
      console.log(error);
    }
  }

  async getCart(idCart) {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      }
      let carts = await fs.promises.readFile(this.path, "utf8"); // en la lectura lo tengo en formato json
      carts = JSON.parse(carts);
      const cart = carts.find((c) => c.id === idCart);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      console.log("entro en create carts: " + carts);
      const newCart = {
        id: uuidv4(),
        products: [],
      };

      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(idCart, idProd) {
    try {
      const cart = await this.getCart(idCart);
      console.log(cart);
      if (!cart || cart.length == 0) {
        console.log("Error: The cart not exist");
        return;
      }

      console.log("cart products: " + cart);

      console.log(JSON.stringify(cart));
      let products = cart.products.filter((item) => item.product.id === idProd);
      if (products.length === 0) {
        products = [{ product: { id: idProd }, quantity: 0 }];
        cart.products.push(products[0]);
      }
      products[0].quantity++;

      let carts = await this.getCarts();
      carts = carts.map((c) => {
        if (c.id != idCart) {
          return c;
        }
        return cart;
      });

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
    } catch (error) {
      console.log(error);
    }
  }
}
