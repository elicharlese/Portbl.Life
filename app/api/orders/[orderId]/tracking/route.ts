import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequest } from '@/lib/middleware';

// GET /api/orders/[orderId]/tracking - Get order tracking information
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const validation = await validateRequest(request);
    if (!validation.isValid || !validation.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { orderId } = params;

    // Get order with tracking information
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: validation.user.id,
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        paymentStatus: true,
        fulfillmentStatus: true,
        trackingNumber: true,
        shippingMethod: true,
        createdAt: true,
        updatedAt: true,
        shippingAddress: {
          select: {
            firstName: true,
            lastName: true,
            address1: true,
            address2: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
          },
        },
        items: {
          select: {
            id: true,
            title: true,
            variantTitle: true,
            image: true,
            quantity: true,
            price: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Mock tracking events (in real implementation, this would come from shipping provider API)
    const trackingEvents = order.trackingNumber ? [
      {
        status: 'Order Placed',
        description: 'Your order has been received and is being processed',
        timestamp: order.createdAt,
        location: 'Processing Center',
      },
      {
        status: 'Order Confirmed',
        description: 'Payment confirmed and order is being prepared',
        timestamp: new Date(order.createdAt.getTime() + 60000), // 1 minute later
        location: 'Fulfillment Center',
      },
      ...(order.fulfillmentStatus !== 'UNFULFILLED' ? [
        {
          status: 'Shipped',
          description: `Package shipped via ${order.shippingMethod}`,
          timestamp: new Date(order.createdAt.getTime() + 86400000), // 1 day later
          location: 'Distribution Center',
        },
      ] : []),
      ...(order.status === 'DELIVERED' ? [
        {
          status: 'Delivered',
          description: 'Package delivered successfully',
          timestamp: new Date(order.createdAt.getTime() + 259200000), // 3 days later
          location: `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
        },
      ] : []),
    ] : [];

    // Calculate estimated delivery date
    const estimatedDelivery = order.createdAt ? 
      new Date(order.createdAt.getTime() + (order.shippingMethod?.includes('Express') ? 172800000 : 432000000)) // 2 days for express, 5 days for standard
      : null;

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        fulfillmentStatus: order.fulfillmentStatus,
        trackingNumber: order.trackingNumber,
        shippingMethod: order.shippingMethod,
        createdAt: order.createdAt,
        estimatedDelivery,
        shippingAddress: order.shippingAddress,
        items: order.items,
      },
      tracking: {
        events: trackingEvents,
        currentStatus: order.status,
        isDelivered: order.status === 'DELIVERED',
      },
    });
  } catch (error) {
    console.error('Error fetching order tracking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
