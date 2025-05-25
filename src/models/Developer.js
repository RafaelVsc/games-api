import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    country: { type: String }
}, { versionKey: false });

const developer = mongoose.model("Developer", developerSchema, "developers");

export {developer, developerSchema};