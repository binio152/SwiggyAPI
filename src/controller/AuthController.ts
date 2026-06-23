import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import bcrypt from "bcrypt";

class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, email, password, phone, type, status } = req.body;
      if (!name || !username || !email || !password) {
        return next(
          new AppError(
            "All fields ( name, username, email, password ) are requried.",
            401,
          ),
        );
      }

      const isExistingEmail = await User.findOne({ email });
      if (isExistingEmail)
        return next(new AppError("This email already exists.", 401));

      const isExistingUser = await User.findOne({ username });
      if (isExistingUser)
        return next(new AppError("This username already exists.", 401));

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        username,
        email,
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

  static async resendEmailVerify(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}
}

export default AuthController;
