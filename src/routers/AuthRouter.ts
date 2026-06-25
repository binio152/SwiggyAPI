import { Router } from "express";
import Validate from "../middlewares/validate";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resendVerificationTokenSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  verificationTokenSchema,
} from "../schemas/index";
import AuthController from "../controller/AuthController";

class AuthRouter {
  public router;

  constructor() {
    this.router = Router();
    this.postRoutes();
    this.patchRoutes();
  }

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
      Validate.request({ schema: forgotPasswordSchema, type: "body" }),
      AuthController.sendForgotPasswordOTP,
    );

    this.router.post(
      "/resend-verification",
      Validate.request({ schema: resendVerificationTokenSchema, type: "body" }),
      Validate.jwt,
      AuthController.resendVerificationEmail,
    );

    this.router.post(
      "/change-password",
      Validate.request({ schema: changePasswordSchema, type: "body" }),
      Validate.jwt,
      AuthController.changePassword,
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify-email",
      Validate.request({ schema: verificationTokenSchema, type: "body" }),
      Validate.jwt,
      AuthController.verificationEmail,
    );

    this.router.patch(
      "/reset-password",
      Validate.request({ schema: resetPasswordSchema, type: "body" }),
      AuthController.resetPassword,
    );
  }
}

export default new AuthRouter().router;
