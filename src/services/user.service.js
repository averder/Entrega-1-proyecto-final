import { createHash, isValidPassword } from "../utils.js";
import CartService from "./cart.service.js";
import UserRepository from "../repository/user.repository.js";
import Services from "./class.services.js";

const userRepository = new UserRepository();
const cartService = new CartService();

export default class UserService extends Services {
  constructor() {
    super(userRepository);
    this.userRepository = userRepository;
  }

  register = async (user) => {
    try {
      const { email, password } = user;
      let responseUser = "";
      const cart = await cartService.createCart();
      const commonData = user;
      commonData.password = createHash(password);
      commonData.cart = cart.id;
      if (email === "admin@gmail.com" && password === "admin1234") {
        //await this.userRepository.register(); adentro hace el await dao
        responseUser = await this.userRepository.register({
          ...commonData,
          role: "admin",
        });
      } else {
        responseUser = await this.userRepository.register({
          ...commonData,
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

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.userRepository.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      return userExist;
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.userRepository.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id, profile) => {
    try {
      return await this.userRepository.getById(id, profile);
    } catch (error) {
      throw new Error(error);
    }
  };
}
