import errorBase from "./errorBase.js";

class NotFoundRequest extends errorBase {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

export default NotFoundRequest;
