import express from "express";
import connectDb from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectDb();

connection.on("error", (err) => {
    console.error("connection db error",err);
});

connection.once("open", () => {
    console.log("connected to mongodb");
})

const app = express();
routes(app)

app.delete("/games/:id", (req, res) => {
    const index = getGameById(req.params.id);
    games.splice(index, 1);
    res.status(204).send("Game Deleted");

})

export default app;