import { HttpStatus } from "../constants.js";
import { response } from "../helpers.js";

export const productsValidator = (req, res, next) => {
  const product = req.body;
  const fieldsToCheck = [
    "title",
    "description",
    "code",
    "price",
    "status",
    "stock",
    "category",
  ];
  const allFieldsExist = fieldsToCheck.every((key) =>
    Object.keys(product).includes(key)
  );
  if (!allFieldsExist)
    response(res, HttpStatus.BAD_REQUEST, "The product is incomplete");
  else {
    next();
  }
};
