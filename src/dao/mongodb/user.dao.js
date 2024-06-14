import { UserModel } from "./models/user.model.js";

const register = async (user) => {
  try {
    const { email } = user;
    const existUser = await UserModel.findOne({ email });
    if (!existUser) return await UserModel.create(user);
    else return null;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (email, password) => {
  try {
    return await UserModel.findOne({ email, password }); //null || user
  } catch (error) {
    throw new Error(error);
  }
};

export const UserMongoDAO = {
  register,
  login,
};
