import { Router } from "express";
import Validate from "../middlewares/validate";
import { signUpSchema } from "../schemas";
import AuthController from "../controller/AuthController";

class AuthRouter {
  public router;

  constructor() {
    this.router = Router();
    this.postRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post(
      "/signup",
      Validate.request({ schema: signUpSchema, type: "body" }),
      AuthController.signUp,
    );
  }
}

export default new AuthRouter().router;
