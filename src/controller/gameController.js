import { game } from "../models/index.js";
import { developer } from "../models/Developer.js";
import NotFoundRequest from "../errors/NotFoundRequest.js";

class GamesController {
  static async getGames(req, res, next) {
    try {
      const gamesQuery = game.find();

      req.result = gamesQuery;

      req.allowedSortFields = ["_id", "title", "releaseYear"];

      next();
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req, res, next) {
    try {
      const { id } = req.params;
      const foundGame = await game
        .findById(id, {}, { autopopulate: false })
        .populate("developer");

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

  static async getGamesByQuery(req, res, next) {
    const {
      developer: developerName,
      platform,
      title,
      minHours,
      maxHours,
      fromReleaseYear,
      toReleaseYear,
    } = req.query;
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

      if (minHours || maxHours) {
        filter["durationHours"] = {};
        if (minHours) filter["durationHours"].$gte = Number(minHours);
        if (maxHours) filter["durationHours"].$lte = Number(maxHours);
      }

      if (fromReleaseYear || toReleaseYear) {
        filter["releaseYear"] = {};
        if (fromReleaseYear)
          filter["releaseYear"].$gte = Number(fromReleaseYear);
        if (toReleaseYear) filter["releaseYear"].$lte = Number(toReleaseYear);
      }

      const query = game.find(filter);
      req.result = query;
      req.allowedSortFields = ["_id", "title", "releaseYear"];
      return next();
    } catch (error) {
      next(error);
    }
  }
}

export default GamesController;
