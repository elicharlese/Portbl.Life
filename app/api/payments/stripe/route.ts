import { NextRequest } from 'next/server';
import { stripe, createPaymentIntent } from '@/lib/stripe';
import { stripePaymentSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, createErrorResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function createPayment(req: NextRequest) {
  const body = await req.json();
  const { amount, currency = 'usd' } = body;

  try {
    const paymentIntent = await createPaymentIntent(amount, currency);
    
    return createResponse({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    return createErrorResponse(error.message, 400);
  }
}

async function confirmPayment(req: NextRequest) {
  const body = await req.json();
  const { paymentIntentId } = stripePaymentSchema.parse(body);

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return createResponse({
      status: paymentIntent.status,
      paymentIntent,
    });
  } catch (error: any) {
    return createErrorResponse(error.message, 400);
  }
}

export const POST = withErrorHandling(withMethods(['POST'])(createPayment));
export const PUT = withErrorHandling(withMethods(['PUT'])(confirmPayment));
