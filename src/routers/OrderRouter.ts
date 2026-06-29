import { Router } from "express";
import Validate from "../middlewares/validate";
import OrderController from "../controller/OrderController";
import { orderSchema } from "../schemas";

class OrderRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {
    this.router.get("/", Validate.jwt, OrderController.getOrderByUserId);
  }

  postRoutes() {
    this.router.post(
      "/",
      Validate.jwt,
      Validate.request({ schema: orderSchema, type: "body" }),
      OrderController.addOrder,
    );
  }

  patchRoutes() {}
}

export default new OrderRouter().router;
