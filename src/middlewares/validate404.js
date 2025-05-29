import NotFoundRequest from "../errors/NotFoundRequest.js";

function validate404(req, res, next) {
  const error404 = new NotFoundRequest("Not Found");
  next(error404);
}

export default validate404;
