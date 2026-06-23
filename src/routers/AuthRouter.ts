import { Router } from "express";
import Validate from "../middlewares/validate";
import {
  resendVerificationTokenSchema,
  signUpSchema,
  verificationTokenSchema,
} from "../schemas";
import AuthController from "../controller/AuthController";

class AuthRouter {
  public router;

  constructor() {
    this.router = Router();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post(
      "/signup",
      Validate.request({ schema: signUpSchema, type: "body" }),
      AuthController.signUp,
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify",
      Validate.request({ schema: verificationTokenSchema, type: "body" }),
      AuthController.verificationEmail,
    );

    this.router.patch(
      "/resendVerifyEmail",
      Validate.request({ schema: resendVerificationTokenSchema, type: "body" }),
      AuthController.resendVerificationEmail,
    );
  }
}

export default new AuthRouter().router;
