import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateUserSchema, addressSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods, withAuth } from '@/lib/middleware';
import type { AuthenticatedRequest } from '@/types/api';

// Get user profile
async function getUserProfile(req: AuthenticatedRequest) {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User');
  }

  return createResponse(user);
}

// Update user profile
async function updateUserProfile(req: AuthenticatedRequest) {
  const userId = req.user?.id;
  const body = await req.json();
  const userData = updateUserSchema.parse(body);

  const user = await prisma.user.update({
    where: { id: userId },
    data: userData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      avatar: true,
      updatedAt: true,
    },
  });

  return createResponse(user);
}

// Get user addresses
async function getUserAddresses(req: AuthenticatedRequest) {
  const userId = req.user?.id;

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });

  return createResponse(addresses);
}

// Add user address
async function addUserAddress(req: AuthenticatedRequest) {
  const userId = req.user?.id;
  const body = await req.json();
  const addressData = addressSchema.parse(body);

  // If this is being set as default, unset other defaults
  if (addressData.isDefault) {
    await prisma.address.updateMany({
      where: { userId, type: addressData.type },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      ...addressData,
      userId: userId!,
    },
  });

  return createResponse(address, 201);
}

// Get user wishlist
async function getUserWishlist(req: AuthenticatedRequest) {
  const userId = req.user?.id;

  const wishlist = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: {
            take: 1,
            orderBy: { position: 'asc' },
          },
          variants: {
            take: 1,
            orderBy: { price: 'asc' },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return createResponse(wishlist);
}

// Add to wishlist
async function addToWishlist(req: AuthenticatedRequest) {
  const userId = req.user?.id;
  const body = await req.json();
  const { productId } = body;

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new NotFoundError('Product');
  }

  // Add to wishlist (upsert to handle duplicates)
  const wishlistItem = await prisma.wishlist.upsert({
    where: {
      userId_productId: {
        userId: userId!,
        productId,
      },
    },
    update: {},
    create: {
      userId: userId!,
      productId,
    },
  });

  return createResponse(wishlistItem, 201);
}

// Remove from wishlist
async function removeFromWishlist(req: AuthenticatedRequest) {
  const userId = req.user?.id;
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return createResponse({ error: 'Product ID is required' }, 400);
  }

  await prisma.wishlist.deleteMany({
    where: {
      userId,
      productId,
    },
  });

  return createResponse({ message: 'Removed from wishlist' });
}

export const GET = withErrorHandling(withAuth(withMethods(['GET'])(getUserProfile)));
export const PUT = withErrorHandling(withAuth(withMethods(['PUT'])(updateUserProfile)));

// Additional routes would be in separate files:
export { getUserAddresses, addUserAddress, getUserWishlist, addToWishlist, removeFromWishlist };
