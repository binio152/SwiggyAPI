import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import bcrypt from "bcrypt";
import Utils from "../utils/Utils";
import { env } from "../config/env";
import ResendMail from "../utils/ResendMail";

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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Email Verification
      const verification_token = Utils.generateVerificationToken(6);
      const verification_token_time = new Date(
        Date.now() + env.EMAIL_VERIFICATION_TOKEN_TTL,
      );

      const html = ResendMail.generateVerifyEmailHTML(verification_token);
      const { error: resendError } = await ResendMail.sendEmail({
        to: email,
        subject: "Email Verification",
        html,
      });

      if (resendError)
        return res.status(400).json({ success: false, message: resendError });

      const newUser = await User.create({
        name,
        username,
        email,
        verification_token,
        verification_token_time,
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

  static async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { verification_token, email } = req.body;

      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        { email_verified: true },
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
}

export default AuthController;
