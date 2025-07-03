import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSearchSchema } from '@/lib/validations';
import { withErrorHandling, createResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());
  
  const {
    q,
    page,
    limit,
    sortBy = 'createdAt',
    sortOrder,
    category,
    priceMin,
    priceMax,
    vendor,
    tags,
    inStock,
  } = productSearchSchema.parse(params);

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {
    status: 'ACTIVE',
  };

  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { tags: { hasSome: [q] } },
    ];
  }

  if (vendor) {
    where.vendor = { equals: vendor, mode: 'insensitive' };
  }

  if (tags && tags.length > 0) {
    where.tags = { hasSome: tags };
  }

  if (priceMin !== undefined || priceMax !== undefined) {
    where.variants = {
      some: {
        price: {
          ...(priceMin !== undefined && { gte: priceMin }),
          ...(priceMax !== undefined && { lte: priceMax }),
        },
      },
    };
  }

  if (inStock) {
    where.variants = {
      some: {
        inventory: { gt: 0 },
      },
    };
  }

  // Execute query
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        images: true,
        variants: true,
        reviews: {
          where: { status: 'APPROVED' },
          select: { rating: true },
        },
        _count: {
          select: { reviews: true },
        },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  // Calculate average ratings
  const productsWithRatings = products.map((product: any) => ({
    ...product,
    averageRating: product.reviews.length > 0
      ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length
      : 0,
    reviewCount: product._count.reviews,
  }));

  return createResponse({
    products: productsWithRatings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export const GET = withErrorHandling(withMethods(['GET'])(handler));
