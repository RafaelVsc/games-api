import ErrorBase from "./errorBase.js";

class BadRequests extends ErrorBase {
  constructor(message = "One or more fields contain incorrect values") {
    super(message, 400);
  }
}

export default BadRequests;
