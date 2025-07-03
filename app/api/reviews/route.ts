import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createReviewSchema, updateReviewSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods, withAuth, withAdminAuth } from '@/lib/middleware';
import type { AuthenticatedRequest } from '@/types/api';

// Submit a review
async function submitReview(req: AuthenticatedRequest) {
  const userId = req.user?.id;
  const body = await req.json();
  const reviewData = createReviewSchema.parse(body);

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: reviewData.productId },
  });

  if (!product) {
    throw new NotFoundError('Product');
  }

  // Check if user has already reviewed this product
  const existingReview = await prisma.review.findUnique({
    where: {
      productId_userId: {
        productId: reviewData.productId,
        userId: userId!,
      },
    },
  });

  if (existingReview) {
    return createResponse({ error: 'You have already reviewed this product' }, 409);
  }

  // Check if user has purchased this product (for verified reviews)
  const hasPurchased = await prisma.orderItem.findFirst({
    where: {
      productId: reviewData.productId,
      order: {
        userId,
        status: 'DELIVERED',
      },
    },
  });

  const review = await prisma.review.create({
    data: {
      ...reviewData,
      userId: userId!,
      verified: !!hasPurchased,
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return createResponse(review, 201);
}

// Get reviews for a product
async function getProductReviews(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!productId) {
    return createResponse({ error: 'Product ID is required' }, 400);
  }

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: {
        productId,
        status: 'APPROVED',
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.review.count({
      where: {
        productId,
        status: 'APPROVED',
      },
    }),
  ]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length
    : 0;

  return createResponse({
    reviews,
    averageRating,
    totalReviews: total,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// Admin: Get all reviews for moderation
async function getAllReviewsForModeration(req: AuthenticatedRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'PENDING';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { status: status as any },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.review.count({
      where: { status: status as any },
    }),
  ]);

  return createResponse({
    reviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// Admin: Update review status
async function updateReviewStatus(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const { status } = updateReviewSchema.parse(body);

  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new NotFoundError('Review');
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: { status },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      product: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return createResponse(updatedReview);
}

// Mark review as helpful
async function markReviewHelpful(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new NotFoundError('Review');
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: {
      helpful: {
        increment: 1,
      },
    },
  });

  return createResponse({ helpful: updatedReview.helpful });
}

export const POST = withErrorHandling(withAuth(withMethods(['POST'])(submitReview)));
export const GET = withErrorHandling(withMethods(['GET'])(getProductReviews));

// Admin routes would be in separate files
export { getAllReviewsForModeration, updateReviewStatus, markReviewHelpful };
