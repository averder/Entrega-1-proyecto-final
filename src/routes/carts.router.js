import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const router = Router();

router.get("/", [isAuth], CartController.getAllCarts);

router.get("/:idCart", [isAuth], CartController.getCartById);

router.post("/", [isAuth], CartController.createCart);

router.delete("/:idCart", [isAuth], CartController.removeAllFromCart);

router.post("/product/:idProd", [isAuth], CartController.addProductToCart);

router.delete(
  "/:idCart/product/:idProd",
  [isAuth],
  CartController.removeProductFromCart
);

router.put("/:idCart/product/:idProd", [isAuth], CartController.updateQuantity);

router.put("/:idCart", [isAuth], CartController.updateProducts);

export default router;
