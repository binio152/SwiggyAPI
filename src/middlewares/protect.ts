import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(new AppError("Unauthorized", 401));

    const payload = jwt.verify(token, env.JWT_SECRET);

    req.user = payload;

    next();
  } catch {
    next(new AppError("Invalid Token", 401));
  }
};
