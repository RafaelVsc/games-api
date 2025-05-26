import { developer } from "../models/Developer.js";

class DevelopersController {
  static async getDevelopers(req, res, next) {
    try {
      const developersList = await developer.find({});
      res.status(200).json(developersList);
    } catch (error) {
      next(error);
    }
  }

  static async getDeveloperById(req, res, next) {
    try {
      const id = req.params.id;
      const foundedDeveloper = await developer.findById(id);
      if (foundedDeveloper != null) {
        res.status(200).json(foundedDeveloper);
      } else {
        res.status(404).json({ message: `Developer id ${id} not found` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async postDeveloper(req, res, next) {
    try {
      const newDeveloper = await developer.create(req.body);
      res
        .status(201)
        .json({ message: "Developer Created", game: newDeveloper });
    } catch (error) {
      next(error);
    }
  }

  static async putDeveloper(req, res, next) {
    try {
      const id = req.params.id;
      await developer.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Developer Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDeveloper(req, res, next) {
    try {
      const id = req.params.id;
      await developer.findOneAndDelete(id);
      res.status(204).json({ message: "Developer deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default DevelopersController;
