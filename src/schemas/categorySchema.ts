import z from "zod";
import { FoodCategory } from "../constants";

export const categorySchema = z.object({
  name: z.enum(Object.values(FoodCategory)).default(FoodCategory.MAIN_COURSE),
});

export type CategorySchema = z.infer<typeof categorySchema>