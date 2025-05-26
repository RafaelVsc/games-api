import express from "express";
import connectDb from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errors.js";

const connection = await connectDb();

connection.on("error", (err) => {
  console.error("connection db error", err);
});

connection.once("open", () => {
  console.log("connected to mongodb");
});

const app = express();

app.get("/games", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /livros");
  next();
});

routes(app);

app.use(errorMiddleware);

export default app;
