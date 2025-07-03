import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequest } from '@/lib/middleware';
import { updateReviewSchema } from '@/lib/validations';

// GET /api/admin/reviews - Get all reviews for moderation
export async function GET(request: NextRequest) {
  try {
    const validation = await validateRequest(request);
    if (!validation.isValid || !validation.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (validation.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status'); // pending, approved, rejected
    const productId = searchParams.get('productId');
    
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) where.status = status.toUpperCase();
    if (productId) where.productId = productId;

    // Fetch reviews with pagination
    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where,
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
              slug: true,
              images: {
                take: 1,
                orderBy: { position: 'asc' },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const formattedReviews = reviews.map((review: any) => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      status: review.status,
      verified: review.verified,
      helpful: review.helpful,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      user: {
        id: review.user.id,
        name: `${review.user.firstName} ${review.user.lastName}`.trim(),
        email: review.user.email,
      },
      product: {
        id: review.product.id,
        title: review.product.title,
        slug: review.product.slug,
        image: review.product.images[0]?.url,
      },
    }));

    return NextResponse.json({
      reviews: formattedReviews,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews for moderation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
