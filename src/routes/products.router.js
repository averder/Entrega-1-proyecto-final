import { Router } from "express";
const router = Router();
import { productsValidator } from "../middleware/productsValidator.js";
import ProductController from "../controllers/product.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { isAuth } from "../middleware/isAuth.js";

router.get("/", isAuth, ProductController.getAllProducts);

router.get("/:pId", isAuth, ProductController.getById);

router.post(
  "/",
  [productsValidator, isAuth, checkAdmin],
  ProductController.createProduct
);

router.put("/:pId", [isAuth, checkAdmin], ProductController.updateProduct);

router.delete(
  "/:idProduct",
  [isAuth, checkAdmin],
  ProductController.deleteProduct
);

export default router;
