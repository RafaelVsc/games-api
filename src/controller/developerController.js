import { developer } from "../models/index.js";
import NotFoundRequest from "../errors/NotFoundRequest.js";

class DevelopersController {
  static async getDevelopers(req, res, next) {
    try {
      const developerQuery = developer.find();
      req.result = developerQuery;
      req.allowedSortFields = ["_id", "name", "country"];
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getDeveloperById(req, res, next) {
    try {
      const { id } = req.params;
      const developerFound = await developer.findById(id);

      if (!developerFound) {
        return next(new NotFoundRequest(`Developer with ID ${id} not found.`));
      }
      return res.status(200).json(developerFound);
    } catch (error) {
      next(error);
    }
  }

  static async postDeveloper(req, res, next) {
    try {
      const newDeveloper = await developer.create(req.body);
      res
        .status(201)
        .json({ message: "Developer created", developer: newDeveloper });
    } catch (error) {
      next(error);
    }
  }

  static async putDeveloper(req, res, next) {
    try {
      const { id } = req.params;
      const updatedDeveloper = await developer.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedDeveloper) {
        return next(new NotFoundRequest("Developer Id Not Found"));
      }

      res.status(200).json({
        message: "Developer updated successfully",
        developer: updatedDeveloper,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDeveloper(req, res, next) {
    try {
      const { id } = req.params;
      const deletedDeveloper = await developer.findByIdAndDelete(id);

      if (!deletedDeveloper) {
        return next(new NotFoundRequest("Developer with ID not found"));
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default DevelopersController;
