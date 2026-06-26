import z from "zod";

export const citySchema = z.object({
  name: z.string("City name is required"),
  lat: z.number("lat is required"),
  lng: z.number("lng is required"),
  is_active: z.boolean().default(true),
});

export type CitySchema = z.infer<typeof citySchema>;
