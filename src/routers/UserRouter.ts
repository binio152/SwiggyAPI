import { Router } from "express";
import UserController from "../controller/UserController";
import { validate } from "../middlewares/validate";
import { FilterSchema } from "../schemas/user.schema";

class UserRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
  }

  getRoutes() {
    this.router.get("/:id", validate(FilterSchema), UserController.getUserById);
  }

  postRoutes() {}
}

export default new UserRouter().router;
