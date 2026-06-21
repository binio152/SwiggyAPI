import { Router } from "express";
import { validate } from "../middlewares/validate";
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
    this.router.post("/signup", validate(signUpSchema), AuthController.signUp);
  }
}

export default new AuthRouter().router;
