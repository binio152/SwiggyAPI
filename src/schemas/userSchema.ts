import { z } from "zod";

export const getUserById = z.object({
  id: z.string("User ID is required"),
});

export const phoneUpdate = z.object(
  {
    phone: z
      .string("New phone number is required")
      .min(8, "Filter must be at least 8 charecters")
      .max(12, "Filter must be shoter than 12 charecters"),
  },
  {
    error: "No fields provided",
  },
);

export type getUserByIdParams = z.infer<typeof getUserById>;
export type PhoneUpdateInput = z.infer<typeof phoneUpdate>;
