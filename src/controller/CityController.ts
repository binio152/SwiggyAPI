import { NextFunction, Request, Response } from "express";
import City from "../models/City";
import { AppError } from "../utils/AppError";

class CityController {
  static async addCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, lat, lng } = req.body;

      const city = await City.findOne({ name });
      if (city) return next(new AppError("This city name is already exists"));

      const newCity = await City.create({
        name,
        location: { type: "Point", coordinates: [lat, lng] },
      });

      res.status(201).json({
        success: true,
        message: "Appended city successfully",
        newCity,
      });
    } catch (err) {
      console.log("Error occurred while appending city");
      next(err);
    }
  }

  static async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await City.find({});

      res.status(200).json({
        success: true,
        message: "Fetched all cities successfully",
        cities,
      });
    } catch (err) {
      console.log("Error occurred while appending city");
      next(err);
    }
  }
}

export default CityController;
