import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequest } from '@/lib/middleware';
import { wishlistSchema } from '@/lib/validations';
import { ApiError } from '@/lib/errors';

// GET /api/users/wishlist - Get user's wishlist
export async function GET(request: NextRequest) {
  try {
    const validation = await validateRequest(request);
    if (!validation.isValid || !validation.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: validation.user.id,
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: { position: 'asc' },
              take: 1,
            },
            variants: {
              orderBy: { price: 'asc' },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedWishlist = wishlist.map((item: any) => ({
      id: item.id,
      product: {
        id: item.product.id,
        title: item.product.title,
        slug: item.product.slug,
        description: item.product.description,
        image: item.product.images[0]?.url,
        price: item.product.variants[0]?.price,
        compareAtPrice: item.product.variants[0]?.compareAtPrice,
      },
      addedAt: item.createdAt,
    }));

    return NextResponse.json({
      wishlist: formattedWishlist,
      count: wishlist.length,
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users/wishlist - Add product to wishlist
export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(request);
    if (!validation.isValid || !validation.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = wishlistSchema.parse(body);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    });

    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    // Check if already in wishlist
    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: validation.user.id,
          productId: validatedData.productId,
        },
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 409 }
      );
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: validation.user.id,
        productId: validatedData.productId,
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: { position: 'asc' },
              take: 1,
            },
            variants: {
              orderBy: { price: 'asc' },
              take: 1,
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Product added to wishlist',
      item: {
        id: wishlistItem.id,
        product: {
          id: wishlistItem.product.id,
          title: wishlistItem.product.title,
          slug: wishlistItem.product.slug,
          image: wishlistItem.product.images[0]?.url,
          price: wishlistItem.product.variants[0]?.price,
        },
        addedAt: wishlistItem.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/wishlist - Remove product from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const validation = await validateRequest(request);
    if (!validation.isValid || !validation.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Remove from wishlist
    const deletedItem = await prisma.wishlist.deleteMany({
      where: {
        userId: validation.user.id,
        productId: productId,
      },
    });

    if (deletedItem.count === 0) {
      return NextResponse.json(
        { error: 'Product not found in wishlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product removed from wishlist',
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
