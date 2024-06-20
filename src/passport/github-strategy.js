import { userService } from "../services/user.service.js";
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import "dotenv/config";

const strategyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8000/api/users/profile",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile._json.email ?? "";
    const first_name = profile._json.name.split(" ")[0];
    console.log(profile);
    const last_name =
      profile._json.name.split(" ").length === 3
        ? profile._json.name
            .split(" ")[1]
            .concat(" ", profile._json.name.split(" ")[2])
        : profile._json.name.split(" ")[1];
    const user = await userService.getUserByEmail(email);
    if (user) return done(null, user); // ejecuta el callURL
    const newUser = await userService.register({
      first_name,
      last_name,
      email,
      password: " ",
      isGithub: true,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));

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
