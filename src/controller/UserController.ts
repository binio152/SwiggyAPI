import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

class UserController {
  static getUserById(req: Request, res: Response, next: NextFunction) {
    const { query } = req.query;
    console.log(query);

    next(new AppError("User Not Found", 404));
  }
}

export default UserController;
