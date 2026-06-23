import { Router } from "express";
import UserController from "../controller/UserController";
import Validate from "../middlewares/validate";
import { FilterSchema } from "../schemas/user.schema";

class UserRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
  }

  getRoutes() {
    this.router.get(
      "/:id",
      Validate.request({ schema: FilterSchema, type: "body" }),
      UserController.getUserById,
    );
  }

  postRoutes() {}
}

export default new UserRouter().router;
