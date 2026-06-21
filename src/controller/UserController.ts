import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import User from "../models/User";
import { Filter } from "../schemas/user.schema";

class UserController {
  static getUserById(req: Request, res: Response, next: NextFunction) {
    const { query } = req.validated as Filter;
    console.log(query);

    next(new AppError("User Not Found", 404));
  }
}

export default UserController;
