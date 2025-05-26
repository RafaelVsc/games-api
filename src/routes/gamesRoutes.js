import express from "express";
import GamesController from "../controller/gameController.js";
const router = express.Router();

router.get("/games", GamesController.getGames);
router.get("/games/search", GamesController.getGamesByQuery);
router.get("/games/:id", GamesController.getGameById);
router.post("/games", GamesController.postGame);
router.put("/games/:id", GamesController.putGame);
router.delete("/games/:id", GamesController.deleteGame);

export default router;
