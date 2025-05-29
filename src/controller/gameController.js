import game from "../models/Game.js";
import { developer } from "../models/Developer.js";
import NotFoundRequest from "../errors/NotFoundRequest.js";

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
      const { id } = req.params;
      const foundGame = await game.findById(id).populate("developer").exec();

      if (!foundGame) {
        return next(new NotFoundRequest(`Game with ID ${id} not found`));
      }

      return res.status(200).json(foundGame);
    } catch (error) {
      next(error);
    }
  }

  static async postGame(req, res, next) {
    try {
      const newGame = req.body;
      const foundDeveloper = await developer.findById(newGame.developer);

      if (!foundDeveloper) {
        return res.status(404).json({ message: "Developer not found" });
      }

      const insertedGame = await game.create(newGame);
      return res
        .status(201)
        .json({ message: "Game Created", game: insertedGame });
    } catch (error) {
      next(error);
    }
  }

  static async putGame(req, res, next) {
    try {
      const { id } = req.params;
      // mongoose method
      const updatedGame = await game.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedGame) {
        return next(new NotFoundRequest(`Game with ID ${id} not found`));
      }

      return res
        .status(200)
        .json({ message: "Game Updated", game: updatedGame });
    } catch (error) {
      next(error);
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const { id } = req.params;
      const deletedGame = await game.findByIdAndDelete(id);
      if (!deletedGame) {
        return next(new NotFoundRequest(`Game with ID ${id} not found`));
      }
      return res.status(204).send();
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
          return res.status(404).json({ message: "Developer not found" });
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
        .json({ message: `Error retrieving games: ${error.message}` });
    }
  }
}

export default GamesController;
