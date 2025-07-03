import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createProductSchema, updateProductSchema, productVariantSchema } from '@/lib/validations';
import { withErrorHandling, createResponse, NotFoundError } from '@/lib/errors';
import { withMethods, withAdminAuth } from '@/lib/middleware';
import { generateSlug } from '@/lib/utils/index';
import type { AuthenticatedRequest } from '@/types/api';

// Create product
async function createProduct(req: AuthenticatedRequest) {
  const body = await req.json();
  const { variants, ...productData } = body;
  
  const validatedProduct = createProductSchema.parse(productData);
  const validatedVariants = variants?.map((variant: any) => productVariantSchema.parse(variant)) || [];

  const product = await prisma.product.create({
    data: {
      ...validatedProduct,
      slug: generateSlug(validatedProduct.title),
      variants: {
        create: validatedVariants,
      },
    },
    include: {
      variants: true,
      images: true,
    },
  });

  return createResponse(product, 201);
}

// Update product
async function updateProduct(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const productData = updateProductSchema.parse(body);

  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new NotFoundError('Product');
  }

  // If title is being updated, regenerate slug
  const updateData = {
    ...productData,
    ...(productData.title && { slug: generateSlug(productData.title) }),
  };

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: {
      variants: true,
      images: true,
    },
  });

  return createResponse(product);
}

// Delete product
async function deleteProduct(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundError('Product');
  }

  await prisma.product.delete({
    where: { id },
  });

  return createResponse({ message: 'Product deleted successfully' });
}

// Get all products for admin
async function getAdminProducts(req: AuthenticatedRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const skip = (page - 1) * limit;

  const where: any = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { handle: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (status) {
    where.status = status;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        variants: true,
        images: {
          take: 1,
          orderBy: { position: 'asc' },
        },
        _count: {
          select: {
            reviews: true,
            orderItems: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return createResponse({
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// Get admin dashboard stats
async function getDashboardStats(req: AuthenticatedRequest) {
  const [
    totalProducts,
    totalOrders,
    totalUsers,
    pendingReviews,
    recentOrders,
    topProducts,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.review.count({ where: { status: 'PENDING' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    }),
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      _count: {
        productId: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    }),
  ]);

  // Get product details for top products
  const topProductsWithDetails = await Promise.all(
    topProducts.map(async (item: any) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          title: true,
          images: {
            take: 1,
            orderBy: { position: 'asc' },
          },
        },
      });
      return {
        ...product,
        totalSold: item._sum.quantity,
        orderCount: item._count.productId,
      };
    })
  );

  return createResponse({
    stats: {
      totalProducts,
      totalOrders,
      totalUsers,
      pendingReviews,
    },
    recentOrders,
    topProducts: topProductsWithDetails,
  });
}

// Get all orders for admin
async function getAdminOrders(req: AuthenticatedRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  const skip = (page - 1) * limit;

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                title: true,
              },
            },
          },
        },
        shippingAddress: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return createResponse({
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export const POST = withErrorHandling(withAdminAuth(withMethods(['POST'])(createProduct)));
export const GET = withErrorHandling(withAdminAuth(withMethods(['GET'])(getAdminProducts)));
export const PUT = withErrorHandling(withAdminAuth(withMethods(['PUT'])(updateProduct)));
export const DELETE = withErrorHandling(withAdminAuth(withMethods(['DELETE'])(deleteProduct)));

// Additional admin routes
export { getDashboardStats, getAdminOrders };
