import { developer } from "../models/Developer.js";

class DevelopersController {
    static async getDevelopers(req, res) {
        try {
            const developersList = await developer.find({});
            res.status(200).json(developersList);
        } catch (error) {
            res.status(500).json({message: `${error} could not be found`});
        }
    };

    static async getDeveloperById(req, res) {
        try {
            const id =  req.params.id;
            const foundedDeveloper = await developer.findById(id);
            res.status(200).json(foundedDeveloper);
        } catch (error) {
            res.status(500).json({message: `${error} could not be found`});
        }
    };

    static async postDeveloper(req, res) {
        try {
            const newDeveloper = await developer.create(req.body);
            res.status(201).json({message: "Developer Created", game: newDeveloper});
        } catch(error) {
            res.status(500).json({message: `${error} could not be created`});
        }
    };

    static async putDeveloper (req, res) {
        try {
            const id = req.params.id;
            await developer.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Developer Updated"});
        } catch(error) {
            res.status(500).json({message: `${error} could not be updated`});
        }
    };

    static async deleteDeveloper (req, res) {
        try {
            const id = req.params.id;
            await developer.findOneAndDelete(id);
            res.status(204).json({message: "Developer deleted successfully"});
        } catch(error) {
            res.status(500).json({message: `${error} could not be deleted`});
        }
    };
};

export default DevelopersController;