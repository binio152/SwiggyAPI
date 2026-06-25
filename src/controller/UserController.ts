import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import AuthService from "../services/AuthServices";

class UserController {
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      // TS warning id can be string | string[]
      let user;
      if (Array.isArray(id)) {
        user = await AuthService.getUserById(id[0]);
      } else user = await AuthService.getUserById(id);

      res.status(200).json({ user });
    } catch (err) {
      console.log("Error occurred while getting user by id");
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getCurrentUser(req);

      return res
        .status(200)
        .json({ success: true, message: "Profile fetched successfully", user });
    } catch (err) {
      console.log("Error occurred while getting profile");
      next(err);
    }
  }

  static async updatePhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { phone } = req.body;
      const user = await AuthService.getCurrentUser(req);

      // Check if phone number already exists
      const existingPhoneNumber = await User.findOne({
        phone,
        _id: { $ne: user._id },
      });

      if (existingPhoneNumber)
        return next(new AppError("Phone number already exists", 409));

      // Updating phone number
      user.phone = phone;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Phone updated successfully", user });
    } catch (err) {
      console.log("Error occurred while updating phone number");
      next(err);
    }
  }
}

export default UserController;
