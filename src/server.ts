import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routers/UserRouter";
import { AppError } from "./utils/AppError";

class Server {
  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.notFoundHandler();
    this.errorHandler();
  }

  setConfigs() {
    this.connectMongoDB(process.env.DB_URI || "mongodb://127.0.0.1:27017/test");
    this.app.use(morgan("dev"));
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
    this.app.use("/api/users", userRouter);
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
            .json({ success: false, message: err.message.toString() });
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
