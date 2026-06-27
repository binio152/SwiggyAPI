import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import { PostImageBody } from "../schemas";
import { env } from "../config/env";
import Image from "../models/Image";
import { AppError } from "../utils/AppError";

class RestaurantController {
  static async addRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const {
        city_id,
        name,
        description,
        cuisines,
        address,
        lat,
        lng,
        phone,
        opened_time,
        closed_time,
        delivery_time,
        rating,
        rating_count,
        status,
        is_active,
      } = req.body;

      const { filename } = req.file as PostImageBody;
      const image_url = `${env.DOMAIN}/uploads/${filename}`;
      const image = await new Image({ image_url }).save();

      const restaurant = await Restaurant.create({
        user_id: userId,
        city_id,
        image_id: image._id,
        name,
        description,
        cuisines,
        address,
        location: { type: "Point", coordinates: [lng, lat] },
        phone,
        opened_time,
        closed_time,
        delivery_time,
        rating,
        rating_count,
        status,
        is_active,
      });

      res.status(201).json({
        success: true,
        message: "Appended restaurant successfully",
        restaurant,
      });
    } catch (err) {
      console.log("Error occurred while appending restaurant");
      next(err);
    }
  }

  static async getRestaurantById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const restaurant = await Restaurant.findById(id)
        .populate("user_id", "name email -_id")
        .populate("city_id", "name -_id")
        .populate("cuisines")
        .populate("cover", "image_url  -_id");

      res.status(200).json({
        success: true,
        message: "Fetched restaurant successfully",
        restaurant,
      });
    } catch (err) {
      console.log("Error occurred while fetching restaurant");
      next(err);
    }
  }

  static async ratingRestaurant(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { rating: newRating } = req.body;

      const { id } = req.params;

      const restaurant = await Restaurant.findById(id);

      if (!restaurant)
        return next(new AppError("Restaurant is not exists", 404));

      console.log(restaurant);

      restaurant.rating =
        (restaurant.rating_count * restaurant.rating + newRating) /
        (restaurant.rating_count + 1);
      restaurant.rating_count += 1;

      await restaurant.save();
      res.status(200).json({
        success: true,
        message: "Restaurant rated successfully",
        restaurant,
      });
    } catch (err) {
      console.log("Error occurred while updating restaurant");
      next(err);
    }
  }
}

export default RestaurantController;
