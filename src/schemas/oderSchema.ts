import z from "zod";
import { OrderStatus, PaymentMethod } from "../constants";

const orderItemValidation = z.object({
  item_id: z.string("Item id is required"),
  name: z.string("Item name is required"),
  price: z.number("Item price is required"),
  quantity: z.number().int().positive("Quantity must be greater than 0"),
});

const orderSchema = z.object({
  user_id: z
    .string("User id is required")
    .min(6, "User id must be at least 6 characters"),
  restaurant_id: z
    .string("Restaurant id is required")
    .min(6, "Restaurant id must be at least 6 characters"),
  order: z.array(orderItemValidation, "Order items are required"),
  instruction: z.string().optional(),
  address: z.string("Address is required").min(10),
  phone: z
    .string("Phone is required")
    .min(8, "Phone must be at least 8 characters"),
  total: z.number("Total is required"),
  deliveryCharge: z.number("Delivery charge is required"),
  grandTotal: z.number("Grand total is required"),
  payment_status: z.boolean().default(false),
  payment_mode: z
    .enum(Object.values(PaymentMethod), "Payment method is required")
    .default(PaymentMethod.COD),
  status: z
    .enum(Object.values(OrderStatus), "Order status is required")
    .default(OrderStatus.PENDING),
});

export type Order = z.infer<typeof orderSchema>;
