import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import UserRouter from "./routers/userRouter";

class Server {
  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
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
    this.app.use("/api/users", UserRouter);
  }
}

export { Server };
export default Server;
