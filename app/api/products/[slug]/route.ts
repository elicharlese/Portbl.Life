import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function handler(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const product = await prisma.product.findUnique({
    where: { 
      slug,
      status: 'ACTIVE',
    },
    include: {
      images: {
        orderBy: { position: 'asc' },
      },
      variants: {
        include: {
          image: true,
        },
      },
      reviews: {
        where: { status: 'APPROVED' },
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
      },
      collections: {
        include: {
          collection: true,
        },
      },
      _count: {
        select: { reviews: true },
      },
    },
  });

  if (!product) {
    throw new NotFoundError('Product');
  }

  // Calculate average rating
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length
    : 0;

  // Get related products (same collections)
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      status: 'ACTIVE',
      collections: {
        some: {
          collectionId: {
            in: product.collections.map((pc: any) => pc.collectionId),
          },
        },
      },
    },
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
    take: 4,
  });

  return createResponse({
    ...product,
    averageRating,
    reviewCount: product._count.reviews,
    relatedProducts,
  });
}

export const GET = withErrorHandling(withMethods(['GET'])(handler));
