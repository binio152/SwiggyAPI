import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";

class RestaurantController {
  static async addRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        city_id,
        name,
        description,
        cuisines,
        address,
        lat,
        lng,
        phone,
        cover,
        opened_time,
        closed_time,
        delivery_time,
        rating,
        rating_count,
        status,
        is_active,
      } = req.body;

      const userId = req.user?.userId;

      const restaurant = await Restaurant.create({
        user_id: userId,
        city_id,
        name,
        description,
        cuisines,
        address,
        location: { type: "Point", coordinates: [lng, lat] },
        phone,
        cover,
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
}

export default RestaurantController;
