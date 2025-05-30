import express from "express";
import DevelopersController from "../controller/developerController.js";
import paginate from "../middlewares/pagination.js";
const routes = express.Router();

routes.get("/developer", DevelopersController.getDevelopers, paginate);
routes.get("/developer/:id", DevelopersController.getDeveloperById);
routes.post("/developer", DevelopersController.postDeveloper);
routes.put("/developer/:id", DevelopersController.putDeveloper);
routes.delete("/developer/:id", DevelopersController.deleteDeveloper);

export default routes;
