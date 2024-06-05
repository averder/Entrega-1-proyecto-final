import { Router } from "express";
import * as controller from "../controllers/cart.controller.js";
const router = Router();

router.get("/", controller.getAllCarts);

router.post("/", controller.createCart);

router.delete("/:idCart", controller.removeAllFromCart);

router.post("/:idCart/product/:idProd", controller.addProductToCart);

router.delete("/:idCart/product/:idProd", controller.removeProductFromCart);

router.get("/:idCart", controller.getCartById);

router.put("/:idCart/product/:idProd", controller.updateQuantity);

export default router;
