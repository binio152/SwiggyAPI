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
        location: { type: "Point", coordinates: [lat, lng] },
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
}

export default RestaurantController;
