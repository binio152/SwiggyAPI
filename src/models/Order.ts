import { Schema, model } from "mongoose";
import { OrderStatus, PaymentMethod } from "../constants";

const orderItemSchema = new Schema(
  {
    item_id: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
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
    deliveryCharge: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    payment_status: { type: Boolean, required: true },
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
