import { Router } from "express";
const router = Router();
import { productsValidator } from "../middleware/productsValidator.js";
import { controller } from "../controllers/product.controller.js";

router.get("/", controller.getAllProducts);

router.get("/:pId", controller.getProductById);

router.post("/", [productsValidator], controller.createProduct);

router.put("/:pId", controller.updateProduct);

router.delete("/:idProduct", controller.deleteProduct);

export default router;
