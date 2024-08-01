import { transporterGmail } from "../services/email.service.js";

export const sendGmail = async (req, res) => {
  try {
    const { dest, name } = req.body;
    console.log(dest, " ", name);
    const gmailOptions = {
      from: process.env.EMAIL_GMAIL,
      to: dest,
      subject: "Welcome",
      //html: template(name),
    };
    const response = await transporterGmail.sendMail(gmailOptions);
    console.log("email sent!");
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
