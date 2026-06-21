import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";

class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, phone, type, status } = req.body;
      if (!name || !email || !password) {
        return next(
          new AppError(
            "All fields ( name, email, password ) are requried.",
            401,
          ),
        );
      }

      const isExistingUser = await User.findOne({ email });
      if (isExistingUser)
        return next(
          new AppError("User with provided email is already exists", 401),
        );

      const newUser = await User.create({
        name,
        email,
        password,
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
      console.log("Error occurred while loging in");
      next(err);
    }
  }
}

export default AuthController;
