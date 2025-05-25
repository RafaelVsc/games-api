import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_PORT } =
  process.env;

async function connectDb() {
  mongoose.connect(
    `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${MONGO_PORT}/gamesdb?authSource=admin`,
  );
  return mongoose.connection;
}

export default connectDb;
