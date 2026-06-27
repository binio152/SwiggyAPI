import { NextFunction, Request, Response } from "express";
import Cuisine from "../models/Cuisine";

class CuisineController {
  static async addCuisine(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, slug } = req.body;

      const cuisine = await Cuisine.create({ name, slug });

      res.status(201).json({
        success: true,
        message: "Appended cuisine successfully",
        cuisine,
      });
    } catch (err) {
      console.log("Error occurred while appending cuisine");
      next(err);
    }
  }

  
}

export default CuisineController;
