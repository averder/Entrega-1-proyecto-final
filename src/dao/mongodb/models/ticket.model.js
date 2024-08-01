import { Schema, model } from "mongoose";

export const ticketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: String, required: true },
  purchaser: { type: String, required: true },
});

const TicketModel = model("ticket", ticketSchema);

export default TicketModel;
