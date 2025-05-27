import mongoose from "mongoose";
import ErrorBase from "../errors/errorBase.js";
import BadRequests from "../errors/BadRequests.js";
import ValidationErrors from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new BadRequests().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationErrors(error).sendResponse(res);
  } else {
    new ErrorBase().sendResponse(res);
  }
}

export default errorMiddleware;
