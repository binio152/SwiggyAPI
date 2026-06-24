import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import ResendMail from "../utils/ResendMail";
import AuthService from "../services/AuthServices";
import { env } from "process";
import { StringValue } from "ms";
import { EmailTypes, JWTPurposes } from "../constants";

class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, email, password, phone, role, status } = req.body;

      // Duplication Validatation
      const user = await User.findOne(
        { $or: [{ email }, { username }] },
        { email: 1, username: 1 },
      );

      if (user) {
        if (user.email === email)
          return next(new AppError("This email already exists.", 409));

        if (user.username === username)
          return next(new AppError("This username already exists.", 409));
      }

      // Password Hashing
      const hashedPassword = await AuthService.hashPassword(password);

      // Generate OTP Send Email Verification
      const { token: verification_token, token_ttl: verification_token_ttl } =
        AuthService.generateVerificationToken(
          env.EMAIL_VERIFICATION_TOKEN_TTL as StringValue,
        );

      const { error } = await ResendMail.sendVerificationToken({
        token: verification_token,
        ttl: env.EMAIL_VERIFICATION_TOKEN_TTL as StringValue,
        to: email,
        type: EmailTypes.VERIFICATION,
      });
      if (error)
        return res.status(400).json({ success: false, message: error });

      const newUser = await User.create({
        name,
        username,
        email,
        verification_token,
        verification_token_ttl,
        password: hashedPassword,
        phone,
        role,
        status,
      });

      // JWT Creation
      const token = AuthService.jwtSign({
        userId: newUser._id,
        purposes: [JWTPurposes.VERIFY_EMAIL],
      });

      return res.status(201).json({
        success: true,
        message: "Created account successfully",
        user: newUser, // DEV ONLY
        token,
      });
    } catch (err) {
      console.log("Error occurred while signing up");
      next(err);
    }
  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;

      // Find user with email or username
      const user = await User.findOne({
        $or: [{ email: login }, { username: login }],
      });
      if (!user) return next(new AppError("Invalid credentials", 401));

      // Password Validation
      const isPasswordMatch = await AuthService.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordMatch)
        return next(new AppError("Invalid credentials", 401));

      // Verified Email Validation
      if (!user.verified_email)
        return next(new AppError("Please verify your email first!", 403));

      // JWT Creation
      const token = AuthService.jwtSign({
        userId: user._id,
        role: user.role,
        purposes: [JWTPurposes.ACCESS],
      });

      return res.status(200).json({
        success: true,
        message: `User ${user.username} sign in successfully!`,
        token,
      });
    } catch (err) {
      console.log("Error occurred while signing in");
      next(err);
    }
  }

  static async verificationEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { verification_token, email } = req.body;

      // Token Purpose Validation
      const accessToken = AuthService.getAcessToken(req);
      if (
        !AuthService.jwtPurposeVerify(
          accessToken,
          JWTPurposes.VERIFY_EMAIL,
        )
      )
        next(new AppError("Invalid token purpose", 401));

      // Find user with provided email and check if token is not exprired
      // Update email verify status and delete unnecessary fields
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_ttl: { $gt: Date.now() },
        },
        {
          verified_email: true,

          $unset: {
            verification_token: 1,
            verification_token_ttl: 1,
          },
        },
        {
          returnDocument: "after",
        },
      );
      if (!user)
        return next(
          new AppError(
            "Email verification token is exprired. Please try again!",
            401,
          ),
        );

      return res.status(201).json({
        success: true,
        message: "Email verify successfully!",
        user, // DEV ONLY
      });
    } catch (err) {
      console.log("Error occurred while verifying email");
      next(err);
    }
  }

  static async resendVerificationEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.body;

      // Token Purpose Validation
      const accessToken = AuthService.getAcessToken(req);
      if (
        !AuthService.jwtPurposeVerify(
          accessToken,
          JWTPurposes.VERIFY_EMAIL,
        )
      )
        next(new AppError("Invalid token purpose", 401));

      // Token Regeneration
      const { token: verification_token, token_ttl: verification_token_ttl } =
        AuthService.generateVerificationToken(
          env.EMAIL_VERIFICATION_TOKEN_TTL as StringValue,
        );

      // Find user with same email and not verified yet
      // Update verification token and TTL
      const user = await User.findOneAndUpdate(
        {
          email,
          verified_email: false,
        },
        { verification_token, verification_token_ttl },
        {
          returnDocument: "after",
        },
      );

      if (!user)
        return next(
          new AppError("Fail to resend email. Please try again!", 401),
        );

      // Resend Verification Token
      const { error } = await ResendMail.sendVerificationToken({
        token: verification_token,
        ttl: env.EMAIL_VERIFICATION_TOKEN_TTL as StringValue,
        to: email,
        type: EmailTypes.VERIFICATION,
      });
      if (error)
        return res.status(400).json({ success: false, message: error });

      return res.status(201).json({
        success: true,
        message: "Resend verify email successfully!",
        user, // DEV ONLY
      });
    } catch (err) {
      console.log("Error occurred while resending verify email");
      next(err);
    }
  }

  static async sendForgotPasswordOTP(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { login } = req.body;

      // Reset Password OTP Generation
      const {
        token: reset_passwork_token,
        token_ttl: reset_passwork_token_ttl,
      } = AuthService.generateVerificationToken(
        env.RESET_PASSWORD_TOKEN_TTL as StringValue,
      );

      // Finding user with provided username / email
      const user = await User.findOneAndUpdate(
        { $or: [{ username: login }, { email: login }] },
        { reset_passwork_token, reset_passwork_token_ttl },
        { returnDocument: "after" },
      );

      if (!user) return next(new AppError("User not exists", 404));

      if (!user.verified_email)
        return next(new AppError("Please verify your email first!", 403));

      // Send Email
      const { error } = await ResendMail.sendVerificationToken({
        token: reset_passwork_token,
        ttl: env.RESET_PASSWORD_TOKEN_TTL as StringValue,
        to: user.email,
        type: EmailTypes.RESET_PASSWORD,
      });
      if (error)
        return res.status(400).json({ success: false, message: error });

      return res.status(201).json({
        success: true,
        message: "Send reset password email successfully!",
        user, // DEV ONLY
      });
    } catch (err) {
      console.log("Error occurred while verifying email");
      next(err);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      console.log("Error occurred while resending verify email");
      next(err);
    }
  }
}

export default AuthController;
