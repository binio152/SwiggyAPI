import { Router } from "express";
import Validate from "../middlewares/validate";
import CategoryController from "../controller/CategoryController";
import { categorySchema } from "../schemas/categorySchema";

class ItemRouter {
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
      Validate.request({ schema: categorySchema, type: "body" }),
      CategoryController.addCategory,
    );
  }

  patchRoutes() {}
}

export default new ItemRouter().router;
