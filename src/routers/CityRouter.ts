import { Router } from "express";
import Validate from "../middlewares/validate";
import { citySchema } from "../schemas";
import CityController from "../controller/CityController";

class CityRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {
    this.router.get("/", CityController.getCities);
  }

  postRoutes() {
    this.router.post(
      "/",
      Validate.jwt,
      Validate.isAdmin,
      Validate.request({ schema: citySchema, type: "body" }),
      CityController.addCity,
    );
  }

  patchRoutes() {}
}

export default new CityRouter().router;
