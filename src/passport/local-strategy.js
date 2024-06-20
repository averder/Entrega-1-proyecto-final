import { userService } from "../services/user.service.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const strategyConfig = {
  usernameField: "email",
  passportField: "password",
  passReqToCallback: true,
};

//done es una funcion de passport, nos indica el resultado del proceso de autenticacion. Sigue con la ejecucion o indica un error.
// en el controller capturo el error con el null del done.
//Cuando se ejecuta el done llama a la funcion serializeUser internamente y le pasa la info del usario al passport.
//para que passport gestione esa informacion guarde en el req.session
const signUp = async (req, email, password, done) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (user) return done(null, false);
    const newUser = await userService.register(req.body);
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const userLogin = await userService.login({ email, password });
    if (!userLogin) {
      req.session.destroy();
      return done(null, false, { message: "Error Autentication ⛔" });
    }
    return done(null, userLogin);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);

//req.session.passport.user = 'asdas3q423sfsd345'
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
