import { getDAOFromConfig } from "../dao/gateway.js";

const dao = getDAOFromConfig().user;

const register = async (user) => {
  try {
    const dao = getDAOFromConfig().user;
    const existUser = await dao.register(user);
    if (!existUser) {
      return null;
    } else {
      return existUser;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (email, password) => {
  try {
    return await dao.login(email, password); //null || user
  } catch (error) {
    throw new Error(error);
  }
};

export const userService = {
  register,
  login,
};
