import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value !== "",
  message: ({ path }) => `${path} must not be empty.`,
});
