import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";

export const checkAdmin = (req, res, next) => {
  try {
    const { role } = req.session.profile;
    if (role != "admin")
      return response(
        res,
        HttpStatus.UNAUTHORIZED,
        "The user has not permission"
      );
    else next();
  } catch (error) {
    next(error);
  }
};
