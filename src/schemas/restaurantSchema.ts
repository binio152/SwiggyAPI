import z from "zod";
import { RestaurantStatus } from "../constants";

export const restaurantSchema = z.object({
  city_id: z
    .string("Restaurant city is required")
    .min(6, "Restaurant city must be at least 3 characters"),
  name: z
    .string("Restaurant name is required")
    .min(3, "Restaurant name must be at least 3 characters"),
  description: z.string().optional(),
  cuisines: z.array(z.string(), "Restaurant cuisine is required"),
  location: z
    .object({
      type: z.enum(["Point"]).default("Point"),
      coordinates: z.array(z.number()),
    })
    .optional(),
  address: z.string("Restaurant address is required"),
  phone: z.string().optional(),
  cover: z.string().optional(),
  opened_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  closed_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  delivery_time: z.number().int().positive("Delivery time must be positive"),
  rating: z.number().default(0),
  rating_count: z.number().default(0),
  status: z
    .enum(Object.values(RestaurantStatus))
    .default(RestaurantStatus.OPENNING),
  is_active: z.boolean().default(true),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
