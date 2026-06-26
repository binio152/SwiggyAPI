import { Router } from "express";
import CuisineController from "../controller/CuisineController";
import Validate from "../middlewares/validate";
import { cuisineSchema } from "../schemas/cuisineSchema";

class CuisineRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post(
      "/",
      Validate.jwt,
      Validate.isAdmin,
      Validate.request({ schema: cuisineSchema, type: "body" }),
      CuisineController.addCuisine,
    );
  }

  patchRoutes() {}
}

export default new CuisineRouter().router;
