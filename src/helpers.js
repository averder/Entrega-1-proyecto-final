import { HttpStatus } from "./constants.js";

const response = (res, httpStatus, obj, isMsg = true, isFirstLevel = false) => {
  let ret = { msg: obj };
  if (!isMsg) {
    ret = { result: obj };
  }
  if (httpStatus === HttpStatus.OK) {
    ret = obj;
  }
  res.status(httpStatus).json(ret);
};

export { response };
