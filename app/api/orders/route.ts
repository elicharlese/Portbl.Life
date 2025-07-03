import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOrderSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods, withAuth } from '@/lib/middleware';
import { generateOrderNumber, calculateTax, calculateShipping } from '@/lib/utils/index';
import type { AuthenticatedRequest } from '@/types/api';

// Create order
async function createOrder(req: AuthenticatedRequest) {
  const body = await req.json();
  const orderData = createOrderSchema.parse(body);
  
  const userId = req.user?.id;
  const sessionId = req.headers.get('x-session-id');

  // Get cart
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionId },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return createResponse(
      { error: 'Cart is empty' },
      400
    );
  }

  // Verify inventory for all items
  for (const item of cart.items) {
    if (item.variant.inventory < item.quantity) {
      return createResponse(
        { error: `Insufficient inventory for ${item.product.title}` },
        400
      );
    }
  }

  // Calculate totals
  const subtotal = cart.items.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal, orderData.shippingMethod as any);
  const total = subtotal + tax + shipping;

  return await prisma.$transaction(async (tx: any) => {
    // Create addresses
    const shippingAddress = await tx.address.create({
      data: {
        ...orderData.shippingAddress,
        userId: userId || undefined,
      },
    });

    const billingAddress = await tx.address.create({
      data: {
        ...orderData.billingAddress,
        userId: userId || undefined,
      },
    });

    // Create order
    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        email: orderData.email,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
        shippingMethod: orderData.shippingMethod,
        paymentMethod: orderData.paymentMethod,
        paymentDetails: orderData.paymentDetails,
        notes: orderData.notes,
        items: {
          create: cart.items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            title: item.product.title,
            variantTitle: item.variant.title,
            image: item.product.images?.[0]?.url,
          })),
        },
      },
      include: {
        items: true,
        shippingAddress: true,
        billingAddress: true,
      },
    });

    // Update inventory
    for (const item of cart.items) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: {
          inventory: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return createResponse(order, 201);
  });
}

// Get user orders
async function getUserOrders(req: AuthenticatedRequest) {
  const userId = req.user?.id;

  if (!userId) {
    return createResponse([]);
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
                orderBy: { position: 'asc' },
              },
            },
          },
        },
      },
      shippingAddress: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return createResponse(orders);
}

// Get specific order
async function getOrder(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const userId = req.user?.id;

  const order = await prisma.order.findFirst({
    where: {
      id,
      ...(userId && { userId }),
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
                orderBy: { position: 'asc' },
              },
            },
          },
          variant: true,
        },
      },
      shippingAddress: true,
      billingAddress: true,
      solanaPayments: true,
    },
  });

  if (!order) {
    throw new NotFoundError('Order');
  }

  return createResponse(order);
}

export const POST = withErrorHandling(withMethods(['POST'])(createOrder));
export const GET = withErrorHandling(withAuth(withMethods(['GET'])(getUserOrders)));

// For individual order routes, this would be in /app/api/orders/[id]/route.ts
export { getOrder };
