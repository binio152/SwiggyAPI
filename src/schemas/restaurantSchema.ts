import z from "zod";

export const restaurantSchema = z.object({
  name: z
    .string("Restaurant name is required")
    .min(3, "Restaurant name must be at least 3 characters"),
});
