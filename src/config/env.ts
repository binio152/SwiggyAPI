import { z } from "zod";
import { config as loadEnv } from "dotenv";
import { StringValue } from "ms";

loadEnv({ override: true });

const envSchema = z.object({
  DOMAIN: z.coerce.string().default("http://localhost:3000"),
  PORT: z.coerce.number().default(3000),
  DB_URI: z.coerce.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  EMAIL_VERIFICATION_TOKEN_TTL: z.custom<StringValue>(),
  RESET_PASSWORD_TOKEN_TTL: z.custom<StringValue>(),
  RESEND_API_KEY: z.coerce.string(),
  JWT_SECRET: z.coerce.string().min(32),
  JWT_SECRET_TTL: z.custom<StringValue>(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
