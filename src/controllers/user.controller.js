import { HttpStatus } from "../constants.js";
import { Errors } from "../errors.js";
import { response } from "../helpers.js";
import UserService from "../services/user.service.js";
import Controllers from "./class.controller.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      if (!user) response(res, HttpStatus.UNAUTHORIZED, user, false);
      else {
        req.session.profile = {
          email,
          name: `${user.first_name} ${user.last_name}`,
          role: user.role,
          cart: user.cart,
        };
        req.session.password = user.password;
        req.session.info = {
          loggedIn: true,
          contador: 1,
        };
        res.redirect("/products");
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  static register = async (req, res) => {
    try {
      const user = await userService.register(req.body);
      if (!user) {
        response(res, HttpStatus.UNAUTHORIZED, user, false);
      } else {
        console.log(user);
        res.redirect("/products");
        return;
      }
    } catch (error) {
      res.redirect("/register");
      return;
    }
  };

  static visit = (req, res) => {
    req.session.info && req.session.info.contador++;
    res.json({
      msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
    });
  };

  static infoSession = (req, res) => {
    res.json({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
  };

  static logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  };

  static registerResponse = (req, res, next) => {
    try {
      res.json({
        msg: "Register OK",
        session: req.session,
      });
    } catch (error) {
      next(error);
    }
  };

  static loginResponse = async (req, res, next) => {
    //req.session.passport.user
    try {
      let id = null;
      if (req.session.passport && req.session.passport.user)
        id = req.session.passport.user;
      const user = await userService.getUserById(id);
      if (!user) res.status(401).json({ msg: "Error de autenticacion" });
      const { first_name, last_name, email, age, role, cart } = user;
      req.session.profile = {
        email,
        name: `${user.first_name} ${user.last_name}`,
        role: user.role,
        cart: user.cart,
      };
      req.user = user.id;
      req.session.info = {
        loggedIn: true,
        contador: 1,
      };
      req.session.password = user.password;
      res.json({
        msg: "LOGIN OK!",
        user: {
          first_name,
          last_name,
          email,
          age,
          role,
          cart,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static githubResponse = async (req, res, next) => {
    try {
      // console.log(req.user);
      const { first_name, last_name, email, role } = req.user;
      res.json({
        msg: "LOGIN CON GITHUB OK!",
        user: {
          first_name,
          last_name,
          email,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static current = async (req, res, next) => {
    try {
      let id = null;
      if (req.session.passport && req.session.passport.user)
        id = req.session.passport.user;
      const user = await userService.getUserById(id, true);
      if (!user) response(res, HttpStatus.UNAUTHORIZED, user, false);
      res.json({
        user: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
