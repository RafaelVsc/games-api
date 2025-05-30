import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

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
    releaseYear: {
      type: Number,
      min: [1960, "Release year must be 1960 or later"],
      max: [
        new Date().getFullYear(),
        "Release year cannot be in the far future",
      ],
      default: null,
      validate: {
        validator: (value) => value === null || Number.isInteger(value),
        message: "Release year must be an integer",
      },
      required: false,
    },
    durationHours: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 1 && value <= 100;
        },
        message: "Duration hours must be between 1 and 100 hours",
      },
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
      required: [true, "Developer is required"],
      autopopulate: { select: "name -_id" },
    },
  },
  { versionKey: false },
);

gameSchema.plugin(autopopulate);

const Game = mongoose.model("Game", gameSchema, "games");

export default Game;
