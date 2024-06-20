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

const login = async (email) => {
  try {
    return await UserModel.findOne({ email }); //null || user
  } catch (error) {
    throw new Error(error);
  }
};

const getById = async (id) => {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const getByEmail = async (email) => {
  console.log(email);
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error(error);
  }
};

export const UserMongoDAO = {
  register,
  login,
  getByEmail,
  getById,
};
