import express from "express";
import connectDb from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errors.js";
import validate404 from "./middlewares/validate404.js";

const connection = await connectDb();

connection.on("error", (err) => {
  console.error("connection db error", err);
});

connection.once("open", () => {
  console.log("connected to mongodb");
});

const app = express();

app.get("/games", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /games");
  next();
});

routes(app);

app.use(validate404);
app.use(errorMiddleware);

export default app;
