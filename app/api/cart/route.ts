import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addToCartSchema, updateCartItemSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods, withAuth } from '@/lib/middleware';
import { generateId } from '@/lib/utils/index';
import type { AuthenticatedRequest } from '@/types/api';

// Get cart
async function getCart(req: AuthenticatedRequest) {
  const userId = req.user?.id;
  const sessionId = req.headers.get('x-session-id') || generateId();

  let cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionId },
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
    },
  });

  if (!cart && userId) {
    // Create cart if user is logged in
    cart = await prisma.cart.create({
      data: {
        userId,
        sessionId,
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
      },
    });
  }

  if (!cart) {
    return createResponse({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'USD',
    });
  }

  // Calculate totals
  const subtotal = cart.items.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal >= 100 ? 0 : 5.99; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return createResponse({
    ...cart,
    subtotal,
    tax,
    shipping,
    total,
  });
}

// Add item to cart
async function addToCart(req: AuthenticatedRequest) {
  const body = await req.json();
  const { productId, variantId, quantity } = addToCartSchema.parse(body);
  
  const userId = req.user?.id;
  const sessionId = req.headers.get('x-session-id') || generateId();

  // Verify product and variant exist
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    include: { product: true },
  });

  if (!variant || variant.productId !== productId) {
    throw new NotFoundError('Product variant');
  }

  // Check inventory
  if (variant.inventory < quantity) {
    return createResponse(
      { error: 'Insufficient inventory' },
      400
    );
  }

  // Find or create cart
  let cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        sessionId,
      },
    });
  }

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_variantId: {
        cartId: cart.id,
        variantId,
      },
    },
  });

  if (existingItem) {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  } else {
    // Create new cart item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        variantId,
        quantity,
        price: variant.price,
      },
    });
  }

  return createResponse({ message: 'Item added to cart' }, 201);
}

// Update cart item
async function updateCartItem(req: AuthenticatedRequest, { params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const body = await req.json();
  const { quantity } = updateCartItemSchema.parse(body);

  const userId = req.user?.id;
  const sessionId = req.headers.get('x-session-id');

  // Find cart item
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: userId ? { userId } : { sessionId },
    },
    include: {
      variant: true,
    },
  });

  if (!cartItem) {
    throw new NotFoundError('Cart item');
  }

  if (quantity === 0) {
    // Remove item
    await prisma.cartItem.delete({
      where: { id: itemId },
    });
  } else {
    // Check inventory
    if (cartItem.variant.inventory < quantity) {
      return createResponse(
        { error: 'Insufficient inventory' },
        400
      );
    }

    // Update quantity
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  return createResponse({ message: 'Cart updated' });
}

// Remove cart item
async function removeCartItem(req: AuthenticatedRequest, { params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const userId = req.user?.id;
  const sessionId = req.headers.get('x-session-id');

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: userId ? { userId } : { sessionId },
    },
  });

  if (!cartItem) {
    throw new NotFoundError('Cart item');
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  return createResponse({ message: 'Item removed from cart' });
}

export const GET = withErrorHandling(withMethods(['GET'])(getCart));
export const POST = withErrorHandling(withMethods(['POST'])(addToCart));
export const PUT = withErrorHandling(withMethods(['PUT'])(updateCartItem));
export const DELETE = withErrorHandling(withMethods(['DELETE'])(removeCartItem));
