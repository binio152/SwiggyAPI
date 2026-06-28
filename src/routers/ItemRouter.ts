import { Router } from "express";
import Validate from "../middlewares/validate";
import { upload } from "../utils/MulterService";
import ItemController from "../controller/ItemController";
import {
  itemSchema,
  postImageSchema,
  itemQuerySchema,
  itemIdParamsSchema,
} from "../schemas";

class ItemRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {
    this.router.get(
      "/list",
      Validate.request({ schema: itemQuerySchema, type: "query" }),
      ItemController.getFilteredMenuByRestaurantId,
    );

    this.router.get(
      "/:id",
      Validate.request({ schema: itemIdParamsSchema, type: "params" }),
      ItemController.getMenuByRestaurantId,
    );
  }

  postRoutes() {
    this.router.post(
      "/",
      upload.single("image_url"),
      Validate.request({ schema: itemSchema, type: "body" }),
      Validate.request({ schema: postImageSchema, type: "file" }),
      ItemController.addItem,
    );
  }

  patchRoutes() {}
}

export default new ItemRouter().router;
