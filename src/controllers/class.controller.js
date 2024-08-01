import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.service.getAll();
      response(res, HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.getById(id);
      if (!data) response(res, HttpStatus.NOT_FOUND, data);
      else response(res, HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      response(res, HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);
      if (!data) response(res, HttpStatus.BAD_REQUEST, data);
      else response(res, HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);
      if (!data) response(res, HttpStatus.NOT_FOUND, data);
      else response(res, HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };
}
