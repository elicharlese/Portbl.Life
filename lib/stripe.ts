import Stripe from 'stripe';
import { config } from '@/lib/config';

export const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2025-06-30.basil',
  typescript: true,
});

export const createPaymentIntent = async (amount: number, currency = 'usd') => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

export const confirmPaymentIntent = async (paymentIntentId: string) => {
  return await stripe.paymentIntents.confirm(paymentIntentId);
};

export const createCustomer = async (email: string, name?: string) => {
  return await stripe.customers.create({
    email,
    name,
  });
};

export const createRefund = async (paymentIntentId: string, amount?: number) => {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined,
  });
};
