import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routers/UserRouter";
import { success } from "zod";

class Server {
  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.notFoundHandler();
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
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Can not ${req.method} ${req.originalUrl}`,
      });
    });
  }
}

export { Server };
export default Server;
