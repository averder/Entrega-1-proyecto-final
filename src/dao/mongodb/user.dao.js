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
    return await UserModel.findById(id).populate("cart");
  } catch (error) {
    throw new Error(error);
  }
};

const getByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, obj) => {
  try {
    return await UserModel.findByIdAndUpdate(id, obj, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async () => {
  try {
    return await UserModel.find({});
  } catch (error) {
    throw new Error(error);
  }
};

export const UserMongoDAO = {
  register,
  login,
  getByEmail,
  getById,
  update,
  getAll,
};
