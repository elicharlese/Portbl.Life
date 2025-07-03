/**
 * Application configuration
 * Validates environment variables and exports typed config
 */

import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  APP_NAME: z.string().default('Portbl.Life'),

  // Database
  DATABASE_URL: z.string().url(),
  
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url().optional(),

  // Stripe
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),

  // Solana
  SOLANA_RPC_URL: z.string().url(),
  SOLANA_DEVNET_RPC_URL: z.string().url(),
  SOLANA_PRIVATE_KEY: z.string().optional(),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string(),

  // Redis
  REDIS_URL: z.string().url().optional(),

  // Analytics
  VERCEL_ANALYTICS_ID: z.string().optional(),

  // Rate Limiting
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW: z.coerce.number().default(900000), // 15 minutes
});

const env = envSchema.parse(process.env);

export const config = {
  app: {
    name: env.APP_NAME,
    url: env.APP_URL,
    env: env.NODE_ENV,
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
  },
  database: {
    url: env.DATABASE_URL,
  },
  supabase: {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
  },
  auth: {
    secret: env.NEXTAUTH_SECRET,
    url: env.NEXTAUTH_URL || env.APP_URL,
  },
  stripe: {
    publishableKey: env.STRIPE_PUBLISHABLE_KEY,
    secretKey: env.STRIPE_SECRET_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  },
  solana: {
    rpcUrl: env.SOLANA_RPC_URL,
    devnetRpcUrl: env.SOLANA_DEVNET_RPC_URL,
    privateKey: env.SOLANA_PRIVATE_KEY,
  },
  email: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  redis: {
    url: env.REDIS_URL,
  },
  analytics: {
    vercelId: env.VERCEL_ANALYTICS_ID,
  },
  rateLimit: {
    max: env.RATE_LIMIT_MAX,
    window: env.RATE_LIMIT_WINDOW,
  },
} as const;

export type Config = typeof config;
