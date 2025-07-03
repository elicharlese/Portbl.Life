import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequest } from '@/lib/middleware';
import { updateReviewSchema } from '@/lib/validations';

// PUT /api/admin/reviews/[reviewId] - Update review status (approve/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: { reviewId: string } }
) {
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

    const { reviewId } = params;
    const body = await request.json();
    const validatedData = updateReviewSchema.parse(body);

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        product: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!existingReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Update review status
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        status: validatedData.status.toUpperCase() as any,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        product: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    // If review is approved, we might want to send a notification email
    // This would be implemented with your email service
    if (validatedData.status === 'approved' && existingReview.status === 'PENDING') {
      console.log(`Review approved for ${updatedReview.product.title} by ${updatedReview.user.firstName} ${updatedReview.user.lastName}`);
      // TODO: Send approval email
    }

    return NextResponse.json({
      message: `Review ${validatedData.status.toLowerCase()} successfully`,
      review: {
        id: updatedReview.id,
        status: updatedReview.status,
        rating: updatedReview.rating,
        title: updatedReview.title,
        content: updatedReview.content,
        updatedAt: updatedReview.updatedAt,
        user: {
          name: `${updatedReview.user.firstName} ${updatedReview.user.lastName}`.trim(),
          email: updatedReview.user.email,
        },
        product: {
          title: updatedReview.product.title,
          slug: updatedReview.product.slug,
        },
      },
    });
  } catch (error) {
    console.error('Error updating review status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reviews/[reviewId] - Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { reviewId: string } }
) {
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

    const { reviewId } = params;

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Delete review
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
