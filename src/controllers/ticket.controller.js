import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.service.js";
import { response } from "../helpers.js";
import { HttpStatus } from "../constants.js";
const ticketService = new TicketService();

export default class TicketController extends Controllers {
  constructor() {
    super(ticketService);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await ticketService.generateTicket(user);
      if (!ticket) response(res, HttpStatus.NOT_FOUND, "Error generate ticket");
      else response(res, HttpStatus.OK, ticket);
    } catch (error) {
      next(error);
    }
  }
}
