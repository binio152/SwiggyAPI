import z from "zod";

export const postImageSchema = z.object({
  path: z.string("Path is required"),
  filename: z.string("Path is required"),
});

export const getImageSchema = z.object({
  id: z.string("Image ID is required"),
});

export type PostImageBody = z.infer<typeof postImageSchema>;
export type GetImageParams = z.infer<typeof getImageSchema>;
