import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("3000"),
    NODE_ENV: z.union([z.literal("development"), z.literal("production"), z.literal("test")]).default("development"),
    JWT_SECRET: z.string().default("123_321:etnik:2026/3rd/march/123"),
    JWT_EXPIRES_IN: z.string().default("1h"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Nevalidni varijabli od okolinata:", _env.error.format());
    process.exit(1);
}

export const env = _env.data;
