import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { PostImageBody } from "../schemas";
import Image from "../models/Image";
import Item from "../models/Item";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";
import { AppError } from "../utils/AppError";

class ItemController {
  static async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        restaurant_id,
        category_id,
        name,
        price,
        description,
        discount_price,
        is_veg,
        is_available,
        is_active,
      } = req.body;

      const restaurant = await Restaurant.findById(restaurant_id);
      if (!restaurant)
        return next(new AppError("Restaurant is not exists", 404));

      const category = await Category.findById(category_id);
      if (!category) return next(new AppError("Category is not exists", 404));

      const { filename } = req.file as PostImageBody;
      const image_url = `${env.DOMAIN}/uploads/${filename}`;
      const image = await Image.create({ image_url });

      const item = await Item.create({
        restaurant_id,
        image_id: image._id,
        category_id,
        name,
        description,
        price,
        discount_price,
        is_veg,
        is_available,
        is_active,
      });

      res
        .status(200)
        .json({ success: true, message: "Created item successfully", item });
    } catch (err) {
      console.log("Error occurred while appending item");
      next(err);
    }
  }

  static async getMenuByRestaurantId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.query;

      const menu = await Item.find({ id });
      if (!menu || menu.length === 0)
        return next(new AppError("Menu items is not exists"));

      res
        .status(200)
        .json({ success: true, message: `Fetched ${menu.length} items`, menu });
    } catch (err) {
      console.log("Error occurred while fetching menu");
      next(err);
    }
  }

  static async getFilteredMenuByRestaurantId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id, filter } = req.query;

      const filterId = await Category.findOne({ name: filter as string });

      const menu = filterId
        ? await Item.find({
            restaurant_id: id as string,
            category_id: filterId?._id,
          })
        : await Item.find({
            restaurant_id: id as string,
          });

      if (!menu || menu.length === 0)
        return next(new AppError("Menu items is not exists"));

      res
        .status(200)
        .json({ success: true, message: `Fetched ${menu.length} items`, menu });
    } catch (err) {
      console.log("Error occurred while fetching menu");
      next(err);
    }
  }
}

export default ItemController;
