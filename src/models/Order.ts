import { Schema, model } from "mongoose";
import { OrderStatus, PaymentMethod } from "../constants";

const orderItemSchema = new Schema(
  {
    item_id: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    order: { type: [orderItemSchema], required: true },
    instruction: { type: String },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    total: { type: Number, required: true },
    delivery_charge: { type: Number, required: true },
    grand_total: { type: Number, required: true },
    payment_status: { type: Boolean, required: true, default: false },
    payment_mode: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.COD,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model("Order", orderSchema);

export default Order;
