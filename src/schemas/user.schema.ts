import { z } from "zod";

export const FilterSchema = z.object({
  query: z.object(
    {
      filter: z
        .string("filter is required")
        .min(3, "Filter must be at least 3 charecters"),
    },
    {
      error: "No fields provided",
    },
  ),
});

export type Filter = z.infer<typeof FilterSchema>;
