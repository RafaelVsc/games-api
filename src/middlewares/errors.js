import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "One or more data is incorrect" });
  } else {
    res.status(500).json({ message: `Internal Server Error ${error}` });
  }
}

export default errorMiddleware;
