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

    this.router.post(
      "/forgot-password",
      Validate.request({ schema: resetPasswordSchema, type: "body" }),
      AuthController.sendForgotPasswordOTP,
    );

    this.router.post(
      "/resend-verification",
      Validate.request({ schema: resendVerificationTokenSchema, type: "body" }),
      Validate.jwt,
      AuthController.resendVerificationEmail,
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify-email",
      Validate.request({ schema: verificationTokenSchema, type: "body" }),
      Validate.jwt,
      AuthController.verificationEmail,
    );
  }
}

export default new AuthRouter().router;
