import { getDAOFromConfig } from "../dao/gateway.js";
import UserDTO from "../dto/user.dto.js";

export default class UserRepository {
  constructor() {
    this.userDao = getDAOFromConfig().user;
  }

  async register(user) {
    try {
      const { email } = user;
      const existUser = await this.userDao.getByEmail(email);
      if (!existUser) {
        return await this.userDao.register(user);
      } else return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email) {
    try {
      const user = await this.userDao.getByEmail(email);
      return new UserDTO(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id, profile = false) {
    try {
      const user = await this.userDao.getById(id);
      return profile ? new UserDTO(user) : user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // esta es otra opcion en vez de pasarle profile en true creo un metodo con ese nombre y devuelve el DTO
  //   async getProfileById(id, profile = true) {
  //     try {
  //       const user = await this.userDao.getById(id);
  //       return  new UserDTO(user);
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   }

  async getByEmail(email) {
    try {
      return await this.userDao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  }

  async userUpdate(id, object) {
    try {
      return await this.userDao.update(id, object);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      return await this.userDao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userDao.getAll();
      let usersDTO = [];
      users.forEach((u) => {
        usersDTO.push(new UserDTO(u));
      });
      return usersDTO;
    } catch (error) {
      throw new Error(error);
    }
  }
}
