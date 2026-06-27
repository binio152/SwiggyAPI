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
  cuisines: z.preprocess(
    (value) => {
      if (!value) return [];
      if (typeof value === "string" && value.startsWith("[")) {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      }

      if (typeof value === "string" && value.includes(",")) {
        return value.split(",").map((item) => item.trim());
      }
      return Array.isArray(value) ? value : [value];
    },
    z.array(z.string()).min(1, "Restaurant cuisine is required"),
  ),
  address: z.string("Restaurant address is required"),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  phone: z.string().optional(),
  opened_time: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalueid time format (HH:MM)",
    ),
  closed_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  delivery_time: z.coerce
    .number()
    .int()
    .positive("Delivery time must be positive"),
  rating: z.coerce.number().optional().default(0),
  rating_count: z.coerce.number().optional().default(0),
  status: z
    .enum(Object.values(RestaurantStatus))
    .default(RestaurantStatus.OPENNING),
  is_active: z.boolean().default(true),
});

export const ratingSchema = z.object({
  rating: z.coerce.number(),
});

export const restaurantParams = z.object({
  id: z.string("Restaurant id is required"),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type RestaurantRating = z.infer<typeof ratingSchema>;
export type RestaurantParams = z.infer<typeof restaurantParams>;
