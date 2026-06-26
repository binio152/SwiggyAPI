import { Router } from "express";
import Validate from "../middlewares/validate";
import { restaurantSchema } from "../schemas";
import RestaurantController from "../controller/RestaurantController";

class RestaurantRouter {
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
      Validate.request({ schema: restaurantSchema, type: "body" }),
      RestaurantController.addRestaurant,
    );
  }

  patchRoutes() {}
}

export default new RestaurantRouter().router;
