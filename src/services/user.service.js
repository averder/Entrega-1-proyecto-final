import { createHash, isValidPassword } from "../utils.js";
import CartService from "./cart.service.js";
import UserRepository from "../repository/user.repository.js";
import Services from "./class.services.js";
import { hasBeenMoreThanXTime } from "./../utils.js";
import { transporterGmail } from "./email.service.js";

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
      const { email, password, req } = user;
      const commonData = user;
      let userExist = await this.userRepository.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      await this.userRepository.register({
        ...commonData,
      });
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

  updateLastConnection = async (userId) => {
    return await this.userRepository.userUpdate(userId, {
      last_connection: new Date(),
    });
  };

  updatePremiumUser = async (userId) => {
    return await this.userRepository.userUpdate(userId, {
      isPremium: true,
    });
  };

  checkUsersLastConnection = async () => {
    try {
      const usersInactive = [];
      const users = await this.userRepository.getAll();
      if (users.length > 0) {
        for (const user of users) {
          if (
            user.last_connection &&
            hasBeenMoreThanXTime(user.last_connection)
          ) {
            console.log(
              `Han pasado mas de 48hs de la ultima conexion de ${user._id}`
            );
            await this.userRepository.userUpdate(user._id, {
              active: false,
            });
            //ENVIO DE MAIL
            //..................
            usersInactive.push(user.email);
            await this.sendUserGmail(user.email);
          }
        }
      }
      return usersInactive;
    } catch (error) {
      throw new Error(error);
    }
  };

  sendUserGmail = async (email) => {
    const gmailOptions = {
      from: process.env.EMAIL_GMAIL,
      to: email,
      subject: "Your account has been deactivated due to inactivity",
      //html: template(name),
    };
    await transporterGmail.sendMail(gmailOptions);
  };

  getAllUsers = async () => {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw new Error(error);
    }
  };
}
