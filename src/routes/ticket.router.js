import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const ticketController = new TicketController();

const router = Router();

router.post("/purchase", [isAuth], ticketController.generateTicket);

export default router;
