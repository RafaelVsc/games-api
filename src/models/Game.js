import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Title is required"] },
    platforms: {
      type: [String],
      required: [true, "Platform is required"],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one platform must be specified",
      },
    },
    releaseYear: { type: Number, required: false, default: null },
    durationHours: { type: Number },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
      required: [true, "Developer is required"],
    },
  },
  { versionKey: false },
);

const Game = mongoose.model("Game", gameSchema, "games");

export default Game;
