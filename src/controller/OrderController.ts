import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import Restaurant from "../models/Restaurant";
import { OrderItem } from "../schemas";
import Order from "../models/Order";
import Item from "../models/Item";

class OrderController {
  static async addOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        restaurant_id,
        order,
        instruction,
        address,
        phone,
        payment_status,
        payment_mode,
        status,
      } = req.body;

      const userId = req.user?.userId;

      // Check if restaurant is exists
      const restaurant = await Restaurant.findById(restaurant_id);
      if (!restaurant)
        return next(new AppError("Restaurant is not exists", 404));

      // Calculate Order Price and get Order list
      const orderListId = order.map((item: OrderItem) => item?.item_id);
      const orderList = await Item.find({ _id: { $in: orderListId } });

      const oderItemTotal = order.reduce((acc: number, item: OrderItem) => {
        const foundDbItem = orderList.find(
          (orderList) => orderList._id.toString() === item.item_id.toString(),
        );

        return (
          acc +
          (foundDbItem ? Number(foundDbItem.price) * Number(item.quantity) : 0)
        );
      }, 0);

      const deliveryCharge = oderItemTotal > 100 ? 0 : 20;
      const grandTotal = oderItemTotal + deliveryCharge;

      const newOrder = await Order.create({
        restaurant_id,
        user_id: userId,
        order,
        instruction,
        address,
        phone,
        total: oderItemTotal,
        delivery_charge: deliveryCharge,
        grand_total: grandTotal,
        payment_status,
        payment_mode,
        status,
      });

      res.status(201).json({
        success: true,
        message: "Created order successfully",
        newOrder,
      });
    } catch (err) {
      console.log("Error occurred while appending order");
      next(err);
    }
  }

  static async getOrderByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user?.userId;

      const orders = await Order.find({ user_id: userId })
        .populate("order.item_id user_id restaurant_id", "name image_id price -_id");

      res.status(200).json({ orders });
    } catch (err) {
      console.log("Error occurred while fetching order by user id");
      next(err);
    }
  }
}

export default OrderController;
