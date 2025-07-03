import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cryptoPaymentSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';
import { verifySolanaTransaction, monitorTransactionConfirmation } from '@/blockchain/solana';

async function createCryptoPayment(req: NextRequest) {
  const body = await req.json();
  const { orderId, walletAddress, amount, currency } = cryptoPaymentSchema.parse(body);

  // Verify order exists
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new NotFoundError('Order');
  }

  // Create Solana payment record
  const payment = await prisma.solanaPayment.create({
    data: {
      orderId,
      walletAddress,
      amount,
      currency,
      status: 'PENDING',
    },
  });

  return createResponse({
    paymentId: payment.id,
    recipientAddress: process.env.SOLANA_WALLET_ADDRESS || 'CONFIGURE_WALLET_ADDRESS',
    amount,
    currency,
    reference: payment.id,
  }, 201);
}

async function verifyPayment(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const { transactionHash } = body;

  const payment = await prisma.solanaPayment.findUnique({
    where: { id },
    include: { order: true },
  });

  if (!payment) {
    throw new NotFoundError('Payment');
  }

  // Verify transaction on blockchain
  const isValid = await verifySolanaTransaction(
    transactionHash,
    Number(payment.amount),
    process.env.SOLANA_WALLET_ADDRESS || 'CONFIGURE_WALLET_ADDRESS'
  );

  if (!isValid) {
    return createResponse({ error: 'Transaction verification failed' }, 400);
  }

  // Update payment and order status
  await prisma.$transaction(async (tx: any) => {
    await tx.solanaPayment.update({
      where: { id },
      data: {
        transactionHash,
        status: 'CONFIRMING',
      },
    });

    await tx.order.update({
      where: { id: payment.orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
    });
  });

  // Start monitoring for confirmation
  monitorTransactionConfirmation(transactionHash).then(async (confirmed) => {
    if (confirmed) {
      await prisma.solanaPayment.update({
        where: { id },
        data: { status: 'CONFIRMED' },
      });
    } else {
      await prisma.solanaPayment.update({
        where: { id },
        data: { status: 'FAILED' },
      });
    }
  });

  return createResponse({
    status: 'CONFIRMING',
    transactionHash,
  });
}

async function getPaymentStatus(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const payment = await prisma.solanaPayment.findUnique({
    where: { id },
    include: { order: true },
  });

  if (!payment) {
    throw new NotFoundError('Payment');
  }

  return createResponse(payment);
}

export const POST = withErrorHandling(withMethods(['POST'])(createCryptoPayment));
export const PUT = withErrorHandling(withMethods(['PUT'])(verifyPayment));
export const GET = withErrorHandling(withMethods(['GET'])(getPaymentStatus));
