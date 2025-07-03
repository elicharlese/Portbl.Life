import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequest } from '@/lib/middleware';

// GET /api/admin/analytics - Get admin analytics dashboard data
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
    const period = searchParams.get('period') || '30d'; // 7d, 30d, 90d, 1y
    
    // Calculate date range
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Fetch analytics data in parallel
    const [
      totalUsers,
      newUsers,
      totalOrders,
      newOrders,
      totalRevenue,
      periodRevenue,
      totalProducts,
      lowStockProducts,
      pendingReviews,
      recentOrders,
      topProducts,
      salesByDay,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // New users in period
      prisma.user.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Total orders
      prisma.order.count(),
      
      // New orders in period
      prisma.order.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Total revenue
      prisma.order.aggregate({
        where: {
          paymentStatus: 'PAID',
        },
        _sum: {
          total: true,
        },
      }),
      
      // Period revenue
      prisma.order.aggregate({
        where: {
          paymentStatus: 'PAID',
          createdAt: {
            gte: startDate,
          },
        },
        _sum: {
          total: true,
        },
      }),
      
      // Total products
      prisma.product.count({
        where: {
          status: 'ACTIVE',
        },
      }),
      
      // Low stock products
      prisma.productVariant.count({
        where: {
          inventory: {
            lte: 10,
          },
        },
      }),
      
      // Pending reviews
      prisma.review.count({
        where: {
          status: 'PENDING',
        },
      }),
      
      // Recent orders
      prisma.order.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          items: {
            select: {
              title: true,
              quantity: true,
              price: true,
            },
          },
        },
      }),
      
      // Top selling products
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
        take: 10,
        where: {
          order: {
            createdAt: {
              gte: startDate,
            },
            paymentStatus: 'PAID',
          },
        },
      }),
      
      // Sales by day
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as orders,
          SUM(total) as revenue
        FROM orders 
        WHERE payment_status = 'PAID' 
          AND created_at >= ${startDate}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `,
    ]);

    // Get product details for top products
    const topProductIds = topProducts.map(p => p.productId);
    const productDetails = await prisma.product.findMany({
      where: {
        id: {
          in: topProductIds,
        },
      },
      select: {
        id: true,
        title: true,
        images: {
          take: 1,
          orderBy: { position: 'asc' },
        },
      },
    });

    // Combine top products with details
    const topProductsWithDetails = topProducts.map(item => {
      const product = productDetails.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        title: product?.title || 'Unknown Product',
        image: product?.images[0]?.url,
        totalSold: item._sum.quantity || 0,
        orderCount: item._count.productId,
      };
    });

    // Calculate growth rates
    const userGrowthRate = totalUsers > 0 ? ((newUsers / totalUsers) * 100) : 0;
    const orderGrowthRate = totalOrders > 0 ? ((newOrders / totalOrders) * 100) : 0;
    const revenueGrowthRate = (totalRevenue._sum.total || 0) > 0 ? 
      (((periodRevenue._sum.total || 0) / (totalRevenue._sum.total || 1)) * 100) : 0;

    const analytics = {
      overview: {
        totalUsers,
        newUsers,
        userGrowthRate: Number(userGrowthRate.toFixed(2)),
        totalOrders,
        newOrders,
        orderGrowthRate: Number(orderGrowthRate.toFixed(2)),
        totalRevenue: totalRevenue._sum.total || 0,
        periodRevenue: periodRevenue._sum.total || 0,
        revenueGrowthRate: Number(revenueGrowthRate.toFixed(2)),
        totalProducts,
        lowStockProducts,
        pendingReviews,
      },
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customer: order.user ? 
          `${order.user.firstName} ${order.user.lastName}` : 
          order.email,
        email: order.email,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        itemCount: order.items.length,
        createdAt: order.createdAt,
      })),
      topProducts: topProductsWithDetails,
      salesByDay: salesByDay as any[],
      period,
      startDate,
      endDate: now,
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
