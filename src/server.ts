import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { AppError } from "./utils/AppError";
import AuthRouter from "./routers/AuthRouter";
import UserRouter from "./routers/UserRouter";
import path from "path";
import ImageRouter from "./routers/ImageRouter";
import multer from "multer";
import { env } from "./config/env";
import CityRouter from "./routers/CityRouter";
import RestaurantRouter from "./routers/RestaurantRouter";

class Server {
  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.notFoundHandler();
    this.errorHandler();
  }

  setConfigs() {
    this.connectMongoDB(env.DB_URI || "mongodb://127.0.0.1:27017/test");
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      "/uploads",
      express.static(path.join(process.cwd(), "uploads")),
    );
  }

  async connectMongoDB(dbURI: string) {
    try {
      await mongoose.connect(dbURI);
      console.log("DB Connected Successfully!");
    } catch (err) {
      console.log("Error occured while connecting DB", err);
    }
  }

  setRoutes() {
    this.app.use("/api/users", UserRouter);
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/images", ImageRouter);
    this.app.use("/api/cities", CityRouter);
    this.app.use("/api/restaurants", RestaurantRouter);
  }

  notFoundHandler() {
    this.app.use((req, _res, next) => {
      next(new AppError(`Can not ${req.method} ${req.originalUrl}`, 404));
    });
  }

  errorHandler() {
    this.app.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.log(err);

        if (err instanceof AppError) {
          return res
            .status(err.statusCode)
            .json({ success: false, message: err.message });
        }

        if (err instanceof multer.MulterError) {
          return res
            .status(500)
            .json({ success: false, message: "Can not upload image", err });
        }

        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      },
    );
  }
}

export { Server };
export default Server;
