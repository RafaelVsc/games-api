import BadRequests from "./BadRequests.js";

class ValidationError extends BadRequests {
  constructor(error) {
    const errorMessage = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");
    super(`Some errors occurred: ${errorMessage}`);
  }
}

export default ValidationError;
