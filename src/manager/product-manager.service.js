import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    const basePath = "./src/";
    this.path = basePath + path;
  }

  async createProduct(product) {
    try {
      if (product) {
        const products = await this.getProducts();
        const prodWithId = {
          id: uuidv4(),
          ...product,
        };
        products.push(prodWithId);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      }
      const products = await fs.promises.readFile(this.path, "utf8"); // en la lectura lo tengo en formato json
      return JSON.parse(products); // lo pasa a javascript
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);
      if (!product) {
        console.log(`ERROR: the product with the id ${id} not exists`);
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(prodId, prodPromise) {
    try {
      const product = await prodPromise;
      let productUpdate = await this.getProductById(prodId);
      let products = await this.getProducts();

      if (!productUpdate || !products) {
        console.log("The product has not been updated");
        return;
      }
      productUpdate.title = product.title;
      productUpdate.description = product.description;
      productUpdate.price = product.price;
      productUpdate.thumbnail = product.thumbnail;
      productUpdate.code = product.code;
      productUpdate.stock = product.stock;

      products = products.map((p) => {
        if (p.id.toString() != prodId.toString()) {
          return p;
        }
        return productUpdate;
      });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`the product ${prodId} has been updated`);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(prodId) {
    try {
      let products = await this.getProducts();
      let prodQty = products.length;
      products = products.filter((p) => p.id != prodId);

      if (products.length === prodQty) {
        console.log(`ERROR: the product with the id ${prodId} not exists`);
        return false;
      }
      console.log(
        `The product with the id ${prodId} has been deleted succesfully`
      );
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("File was deleted");
    } catch (error) {
      console.log(error);
    }
  }
}
