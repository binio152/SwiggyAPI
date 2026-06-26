import { Schema, model } from "mongoose";
import { OrderStatus } from "../constants";

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    order: { type: String, required: true },
    instruction: { type: String },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    total: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    payment_status: { type: Boolean, required: true },
    payment_mode: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: OrderStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model("Order", orderSchema);

export default Order;
