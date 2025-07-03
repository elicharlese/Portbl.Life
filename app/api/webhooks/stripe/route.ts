import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { withErrorHandling, createResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';
import { config } from '@/lib/config';

async function handleStripeWebhook(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return createResponse({ error: 'No signature provided' }, 400);
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripe.webhookSecret
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return createResponse({ error: 'Invalid signature' }, 400);
  }

  console.log('Received webhook event:', event.type);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;

      case 'charge.dispute.created':
        await handleChargeback(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return createResponse({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return createResponse({ error: 'Webhook processing failed' }, 500);
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  const { id: paymentIntentId, metadata } = paymentIntent;
  
  if (!metadata?.orderId) {
    console.error('No order ID in payment intent metadata');
    return;
  }

  // Update order status
  await prisma.order.update({
    where: { id: metadata.orderId },
    data: {
      paymentStatus: 'PAID',
      status: 'CONFIRMED',
      paymentDetails: {
        paymentIntentId,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
    },
  });

  console.log(`Order ${metadata.orderId} payment confirmed`);
}

async function handlePaymentFailure(paymentIntent: any) {
  const { metadata } = paymentIntent;
  
  if (!metadata?.orderId) {
    console.error('No order ID in payment intent metadata');
    return;
  }

  // Update order status
  await prisma.order.update({
    where: { id: metadata.orderId },
    data: {
      paymentStatus: 'FAILED',
      status: 'CANCELLED',
    },
  });

  console.log(`Order ${metadata.orderId} payment failed`);
}

async function handleChargeback(charge: any) {
  const { payment_intent: paymentIntentId } = charge;
  
  // Find order by payment intent
  const order = await prisma.order.findFirst({
    where: {
      paymentDetails: {
        path: ['paymentIntentId'],
        equals: paymentIntentId,
      },
    },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'REFUNDED',
        paymentStatus: 'REFUNDED',
      },
    });

    console.log(`Chargeback received for order ${order.id}`);
  }
}

export const POST = withErrorHandling(withMethods(['POST'])(handleStripeWebhook));
