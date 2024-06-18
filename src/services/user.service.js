import { getDAOFromConfig } from "../dao/gateway.js";
const dao = getDAOFromConfig().user;
import { createHash, isValidPassword } from "../utils.js";

export const register = async (user) => {
  try {
    const { email, password } = user;
    let responseUser = "";
    if (email === "admin@gmail.com" && password === "admin1234") {
      responseUser = await dao.register({
        ...user,
        password: createHash(password),
        role: "admin",
      });
    } else {
      responseUser = await dao.register({
        ...user,
        password: createHash(password),
      });
      console.log(responseUser);
    }
    if (!responseUser) {
      return null;
    }
    return responseUser;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (email, password) => {
  try {
    console.log(email);
    console.log(password);
    const user = await dao.login(email, password); //null || user
    if (!isValidPassword(password, user)) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const userService = {
  register,
  login,
};
