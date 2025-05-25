import express from "express";
import GamesController from "../controller/gameController.js";
const routes = express.Router();

routes.get("/games", GamesController.getGames);
routes.get("/games/search", GamesController.getGamesByQuery);
routes.get("/games/:id", GamesController.getGameById);
routes.post("/games", GamesController.postGame);
routes.put("/games/:id", GamesController.putGame);
routes.delete("/games/:id", GamesController.deleteGame);

export default routes;