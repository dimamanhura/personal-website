import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Telegram
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),

  // Auth.js (NextAuth)
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.url(),
  AUTH_TRUST_HOST: z.preprocess((val) => val === 'true', z.boolean()),

  // Cloudinary
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),

  // AWS General
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().min(1),

  // OpenSearch
  OPENSEARCH_ENDPOINT: z.url(),
  OPENSEARCH_INDEX_NAME: z.string().min(1),

  // Bedrock
  AWS_BEDROCK_REGION: z.string().min(1),
  AWS_BEDROCK_MODEL: z.string().min(1),

  // SQS
  AWS_SQS_QUEUE_URL: z.url(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables. Check your .env file.');
}

export const env = _env.data;
