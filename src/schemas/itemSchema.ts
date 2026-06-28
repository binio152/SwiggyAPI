import { Types } from "mongoose";
import z from "zod";
import { FoodCategory } from "../constants";

export const itemSchema = z.object(
  {
    restaurant_id: z
      .string()
      .refine(Types.ObjectId.isValid, "Invalid restaurant id"),
    category_id: z
      .string()
      .refine(Types.ObjectId.isValid, "Invalid restaurant id"),
    description: z.string().optional(),
    price: z.coerce
      .number("Price is required")
      .min(1, "Price must be at least 1 character"),
    discount_price: z.coerce.number().optional(),
    is_veg: z.coerce.boolean().default(false),
    is_available: z.coerce.boolean().default(true),
    is_active: z.coerce.boolean().default(true),
  },
  { error: "No field provided" },
);

export const itemQuerySchema = z.object({
  id: z.coerce.string().refine(Types.ObjectId.isValid, "Invalid item id"),
  filter: z.enum(Object.values(FoodCategory)).optional(),
});

export const itemIdParamsSchema = z.object({
  id: z.coerce.string().refine(Types.ObjectId.isValid, "Invalid item id"),
});

export type Item = z.infer<typeof itemSchema>;
export type ItemQuery = z.infer<typeof itemQuerySchema>;
export type ItemIdParams = z.infer<typeof itemIdParamsSchema>;
