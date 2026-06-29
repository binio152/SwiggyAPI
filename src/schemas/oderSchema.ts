import z from "zod";
import { OrderStatus, PaymentMethod } from "../constants";
import { Types } from "mongoose";

export const orderItemValidation = z.object({
  item_id: z.string().refine(Types.ObjectId.isValid, "Invalid item id"),
  quantity: z.number().int().positive("Quantity must be greater than 0"),
});

export const orderSchema = z.object({
  restaurant_id: z
    .string()
    .refine(Types.ObjectId.isValid, "Invalid restaurant id"),
  order: z.array(orderItemValidation, "Order items are required"),
  instruction: z.string().optional(),
  address: z.string("Address is required").min(10),
  phone: z
    .string("Phone is required")
    .min(8, "Phone must be at least 8 characters"),
  payment_status: z.boolean().default(false),
  payment_mode: z
    .enum(Object.values(PaymentMethod), "Payment method is required")
    .default(PaymentMethod.COD),
  status: z
    .enum(Object.values(OrderStatus), "Order status is required")
    .default(OrderStatus.PENDING),
});

export type OrderItem = z.infer<typeof orderItemValidation>;
export type Order = z.infer<typeof orderSchema>;
