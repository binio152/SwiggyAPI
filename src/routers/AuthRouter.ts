import { Router } from "express";
import Validate from "../middlewares/validate";
import {
  resendVerificationTokenSchema,
  resetPasswordSchema,
  signInSchema,
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

    this.router.post(
      "/signin",
      Validate.request({ schema: signInSchema, type: "body" }),
      AuthController.signIn,
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify",
      Validate.request({ schema: verificationTokenSchema, type: "body" }),
      Validate.jwt,
      AuthController.verificationEmail,
    );

    this.router.patch(
      "/resendVerifyEmail",
      Validate.request({ schema: resendVerificationTokenSchema, type: "body" }),
      Validate.jwt,
      AuthController.resendVerificationEmail,
    );

    this.router.patch(
      "/reset/password",
      Validate.request({ schema: resetPasswordSchema, type: "body" }),
      AuthController.sendResetPasswordOTP,
    );
  }
}

export default new AuthRouter().router;
