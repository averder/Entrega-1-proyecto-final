import { Router } from "express";
const router = Router();
import {
  login,
  logout,
  visit,
  infoSession,
  register,
  loginResponse,
  registerResponse,
  githubResponse,
} from "../controllers/user.controller.js";
import { validateLogin } from "../middleware/validateLogin.js";
import passport from "passport";
import { isAuth } from "../middleware/isAuth.js";

router.post("/login-passport", passport.authenticate("login"), loginResponse);

router.post(
  "/register-passport",
  passport.authenticate("register"),
  registerResponse
);

router.post("/login", login);

router.post("/register", register);

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/profile",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubResponse
);

router.get("/info", validateLogin, infoSession);

router.get("/secret-endpoint", validateLogin, visit);

router.get("/private", isAuth, (req, res) => res.json({ msg: "Ruta PRIVADA" }));

router.post("/logout", logout);

export default router;
