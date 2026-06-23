import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import Utils from "../utils/Utils";
import ResendMail from "../utils/ResendMail";
import AuthService from "../services/AuthServices";

class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, email, password, phone, type, status } = req.body;

      // Duplication Validatation
      const isExistingEmail = await User.findOne({ email });
      if (isExistingEmail)
        return next(new AppError("This email already exists.", 401));

      const isExistingUser = await User.findOne({ username });
      if (isExistingUser)
        return next(new AppError("This username already exists.", 401));

      // Password Hashing
      const hashedPassword = await AuthService.hashPassword(password);

      // Send Email Verification
      const { verification_token, verification_token_ttl, error } =
        await AuthService.generateVerificationTokenAndSendEmail({ to: email });
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
        type,
        status,
      });

      return res.status(201).json({
        success: true,
        message: "Created account successfully",
        user: newUser,
      });
    } catch (err) {
      console.log("Error occurred while signing up");
      next(err);
    }
  }

  static async verificationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { verification_token, email } = req.body;

      // Find user with provided email and check if token is not exprired
      // Update email verify status and delete unnecessary fields
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_ttl: { $gt: Date.now() },
        },
        {
          email_verified: true,

          $unset: {
            verification_token: 1,
            verification_token_ttl: 1,
          },
        },
        {
          new: true,
        },
      );
      if (!user)
        return next(
          new AppError(
            "Email verification token is exprired. Please try again!",
            401,
          ),
        );

      return res
        .status(201)
        .json({ success: true, message: "Email verify successfully!", user });
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
      // Token Regeneration
      const { verification_token, verification_token_ttl } =
        AuthService.generateVerificationToken();

      // Update verification token and TTL
      const user = await User.findOneAndUpdate(
        {
          email,
        },
        { verification_token, verification_token_ttl },
        {
          new: true,
        },
      );
      if (!user)
        return next(
          new AppError(
            "Email verification token is exprired. Please try again!",
            401,
          ),
        );

      // Resend Verification Token
      const { error } = await ResendMail.sendVerificationToken({
        token: verification_token,
        to: email,
      });
      if (error)
        return res.status(400).json({ success: false, message: error });

      return res.status(201).json({
        success: true,
        message: "Resend verify email successfully!",
        user,
      });
    } catch (err) {
      console.log("Error occurred while resending verify email");
      next(err);
    }
  }
}

export default AuthController;
