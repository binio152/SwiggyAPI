import { Router } from "express";
import UserController from "../controller/UserController";
import Validate from "../middlewares/validate";
import { getUserById, phoneUpdate } from "../schemas";

class UserRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {
    this.router.get("/profile", Validate.jwt, UserController.getProfile);

    this.router.get(
      "/:id",
      Validate.request({ schema: getUserById, type: "params" }),
      UserController.getUserById,
    );
  }

  postRoutes() {}

  patchRoutes() {
    this.router.patch(
      "/update/phone",
      Validate.request({ schema: phoneUpdate, type: "body" }),
      Validate.jwt,
      UserController.updatePhoneNumber,
    );
  }
}

export default new UserRouter().router;
