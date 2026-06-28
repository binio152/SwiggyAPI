import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";

class CategoryController {
  static async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const category = await Category.create({ name });

      res.status(201).json({
        success: true,
        message: "Created category successfully",
        category,
      });
    } catch (err) {
      console.log("Error occurred while appending category");
      next(err);
    }
  }
}

export default CategoryController;
