import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const router = Router();

router.get("/", CartController.getAllCarts);

router.get("/:idCart", CartController.getCartById);

router.post("/", CartController.createCart);

router.delete("/:idCart", CartController.removeAllFromCart);

router.post("/product/:idProd", [isAuth], CartController.addProductToCart);

router.delete("/:idCart/product/:idProd", CartController.removeProductFromCart);

router.put("/:idCart/product/:idProd", CartController.updateQuantity);

router.put("/:idCart", CartController.updateProducts);

export default router;
