import { z } from "zod";
import { config as loadEnv } from "dotenv";

loadEnv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DB_URI: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());

  process.exit(1);
}

export const env = parsedEnv.data;
