import z from "zod";

export const cuisineSchema = z.object({
  name: z
    .string("Cuisine name is required")
    .min(2, "Cuisine name must be at least 2 characters"),
  slug: z
    .string("Cuisine slug is required")
    .min(2, "Cuisine slug must be at least 2 characters"),
  is_active: z.boolean().optional().default(true),
});

export type Cuisine = z.infer<typeof cuisineSchema>;
