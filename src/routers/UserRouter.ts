import { Router } from "express";
import UserController from "../controller/UserController";

class UserRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
  }

  getRoutes() {
    this.router.get("/:id", UserController.getUserById);
  }
}

export default new UserRouter().router;
