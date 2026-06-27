import { Router } from "express";
import Validate from "../middlewares/validate";
import {
  postImageSchema,
  ratingSchema,
  restaurantFilterQuery,
  restaurantIdParams,
  restaurantQuery,
  restaurantSchema,
} from "../schemas";
import RestaurantController from "../controller/RestaurantController";
import { upload } from "../utils/MulterService";

class RestaurantRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {
    this.router.get(
      "/nearest-restaurants",
      Validate.request({ schema: restaurantQuery, type: "query" }),
      RestaurantController.getNearByRestaurant,
    );
    
    this.router.get(
      "/opening-restaurants",
      Validate.request({ schema: restaurantQuery, type: "query" }),
      RestaurantController.getOpeningRestaurants,
    );

    this.router.get(
      "/filtered-restaurants",
      Validate.request({ schema: restaurantFilterQuery, type: "query" }),
      RestaurantController.filterRestaurant,
    );

    this.router.get(
      "/:id",
      Validate.request({ schema: restaurantIdParams, type: "params" }),
      RestaurantController.getRestaurantById,
    );
  }

  postRoutes() {
    this.router.post(
      "/",
      Validate.jwt,
      Validate.isAdmin,
      upload.single("image_url"),
      Validate.request({ schema: restaurantSchema, type: "body" }),
      Validate.request({ schema: postImageSchema, type: "file" }),
      RestaurantController.addRestaurant,
    );
  }

  patchRoutes() {
    this.router.patch(
      "/rating/:id",
      Validate.jwt,
      Validate.request({ schema: ratingSchema, type: "body" }),
      Validate.request({ schema: restaurantIdParams, type: "params" }),
      RestaurantController.ratingRestaurant,
    );
  }
}

export default new RestaurantRouter().router;
