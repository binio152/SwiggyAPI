import express from "express";
import mongoose from "mongoose";

class Server {
  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
  }

  setConfigs() {
    this.connectMongoDB(process.env.DB_URI || "mongodb://127.0.0.1:27017/test");
  }

  async connectMongoDB(dbURI: string) {
    try {
      await mongoose.connect(dbURI);
      console.log("DB Connected Successfully!");
    } catch (err) {
      console.log("Error occured while connecting DB", err);
    }
  }

  setRoutes() {}
}

export { Server };
export default Server;
