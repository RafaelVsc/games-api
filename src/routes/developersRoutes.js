import express from "express";
import DevelopersController from "../controller/developerController.js";
const routes = express.Router();

routes.get("/developer", DevelopersController.getDevelopers);
routes.get("/developer/:id", DevelopersController.getDeveloperById);
routes.post("/developer", DevelopersController.postDeveloper);
routes.put("/developer/:id", DevelopersController.putDeveloper);
routes.delete("/developer/:id", DevelopersController.deleteDeveloper);

export default routes;