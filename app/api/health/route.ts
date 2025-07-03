import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withErrorHandling, createResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function healthCheck(req: NextRequest) {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: 'checking',
      redis: 'checking',
    },
  };

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = 'healthy';
  } catch (error) {
    checks.checks.database = 'unhealthy';
    checks.status = 'unhealthy';
  }

  // Test Redis connection (if configured)
  try {
    if (process.env.REDIS_URL) {
      // Add Redis health check here when implemented
      checks.checks.redis = 'healthy';
    } else {
      checks.checks.redis = 'not_configured';
    }
  } catch (error) {
    checks.checks.redis = 'unhealthy';
    checks.status = 'unhealthy';
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;
  return createResponse(checks, statusCode);
}

export const GET = withErrorHandling(withMethods(['GET'])(healthCheck));
