import { HttpStatus } from "../constants.js";
import { Errors } from "../errors.js";
import { response } from "../helpers.js";
import { userService } from "../services/user.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    if (!user) response(res, HttpStatus.UNAUTHORIZED, user, false);
    //res.status(401).json({ msg: "No estas autorizado" });
    //res.redirect('/error-login)
    else {
      req.session.profile = {
        email,
        name: `${user.first_name} ${user.last_name}`,
        role: user.role,
      };
      req.session.email = email;

      res.redirect("/products");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;
    if (email === "admin@gmail.com" && password === "admin1234") {
      user = await userService.register({
        ...req.body,
        role: "admin",
      });
    } else {
      user = await userService.register(req.body);
      console.log(user);
    }
    if (!user) {
      response(res, HttpStatus.UNAUTHORIZED, user, false);
    } else {
      res.redirect("/products");
      return;
    }
  } catch (error) {
    res.redirect("/register");
  }
};

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
