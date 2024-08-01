import { Router } from "express";
//import { getAllProducts } from "../services/product.service.js";
//import { infoSession } from "../controllers/user.controller.js";

const router = Router();

router.get("", (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/products", async (req, res) => {
  console.log(req.session);
  res.render("products", {
    session: {
      profile: req.session.profile,
      sessionId: req.sessionID,
      cookies: req.cookies,
    },
  });
});

export default router;
