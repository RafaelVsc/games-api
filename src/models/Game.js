import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    platforms: [{ type: String, required: true }],
    releaseYear: { type: Number, required: false, default: null },
    durationHours: { type: Number },
    developer: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true },
}, { versionKey: false });

const Game = mongoose.model('Game', gameSchema, 'games');

export default Game;