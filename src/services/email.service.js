import { createTransport } from "nodemailer";
import "dotenv/config";
import { __dirname } from "../utils.js";

export const transporterGmail = createTransport({
  service: "gmail",
  port: process.env.PORT_GMAIL,
  secure: true,
  auth: {
    user: process.env.EMAIL_GMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
});
