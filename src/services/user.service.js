import { getDAOFromConfig } from "../dao/gateway.js";
const dao = getDAOFromConfig().user;
import { createHash, isValidPassword } from "../utils.js";

const register = async (user) => {
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

// const login = async (email, password) => {
//   try {
//     const user = await dao.login(email); //null || user
//     if (!isValidPassword(password, user)) {
//       return null;
//     }
//     return user;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const login = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    return await dao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    return await dao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const userService = {
  register,
  login,
  getUserByEmail,
  getUserById,
};
