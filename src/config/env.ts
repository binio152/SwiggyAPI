import { z } from "zod";
import { config as loadEnv } from "dotenv";

loadEnv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DB_URI: z.coerce.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  EMAIL_VERIFICATION_TOKEN_TTL: z.coerce.number(),
  RESEND_API_KEY: z.coerce.string()
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
