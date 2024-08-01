import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.controller.js";
import { validateLogin } from "../middleware/validateLogin.js";
import passport from "passport";
import { isAuth } from "../middleware/isAuth.js";

router.post(
  "/login-passport",
  passport.authenticate("login"),
  UserController.loginResponse
);

router.post(
  "/register-passport",
  passport.authenticate("register"),
  UserController.registerResponse
);

//router.post("/login", login);

//router.post("/register", register);

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/profile",
  passport.authenticate("github", { scope: ["user:email"] }),
  UserController.githubResponse
);

router.get("/info", validateLogin, UserController.infoSession);

router.get("/secret-endpoint", validateLogin, UserController.visit);

router.get("/private", isAuth, (req, res) => res.json({ msg: "Ruta PRIVADA" }));

router.get("/current", UserController.current);

router.post("/logout", UserController.logout);

export default router;
