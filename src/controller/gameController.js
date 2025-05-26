import game from "../models/Game.js";
import { developer } from "../models/Developer.js";

class GamesController {
  static async getGames(req, res, next) {
    try {
      const gamesList = await game.find().populate("developer");
      res.status(200).json(gamesList);
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req, res, next) {
    try {
      const id = req.params.id;
      const foundedGame = await game.findById(id).populate("developer");
      res.status(200).json(foundedGame);
    } catch (error) {
      next(error);
    }
  }

  static async postGame(req, res, next) {
    try {
      const newGame = req.body;
      const foundedDeveloper = await developer.findById(newGame.developer);

      if (!foundedDeveloper) {
        return res.status(404).json({ message: "Developer not found" });
      }

      const insertedGame = await game.create(newGame);

      res.status(201).json({ message: "Game Created", game: insertedGame });
    } catch (error) {
      next(error);
    }
  }

  static async putGame(req, res, next) {
    try {
      const id = req.params.id;
      // mongoose method
      const updatedGame = await game.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Game Updated", game: updatedGame });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const id = req.params.id;
      await game.findByIdAndDelete(id);
      res.status(204).json({ message: "Game Deleted", game: game });
    } catch (error) {
      next(error);
    }
  }

  static async getGamesByQuery(req, res) {
    const { developer: developerName, platform, title } = req.query;
    const filter = {};

    try {
      if (developerName) {
        const foundDeveloper = await developer.findOne({
          name: { $regex: new RegExp(developerName, "i") },
        });

        if (!foundDeveloper) {
          return res.status(404).json({ message: "Developer não encontrado" });
        }

        filter["developer"] = foundDeveloper._id;
      }

      if (platform) {
        filter["platforms"] = { $regex: new RegExp(platform, "i") };
      }

      if (title) {
        filter["title"] = { $regex: new RegExp(title, "i") };
      }

      const filteredGames = await game.find(filter).populate("developer");
      res.status(200).json(filteredGames);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro ao buscar jogos: ${error.message}` });
    }
  }
}

export default GamesController;
