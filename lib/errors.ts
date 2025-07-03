import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { config } from '@/lib/config';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, public errors: any[] = []) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends ApiError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends ApiError {
  constructor(message = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

/**
 * Error handler middleware
 */
export const withErrorHandling = (handler: Function) => {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: error.errors,
          },
          { status: 400 }
        );
      }

      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
            code: error.code,
          },
          { status: error.statusCode }
        );
      }

      // Unknown error
      return NextResponse.json(
        {
          success: false,
          error: config.app.isDev 
            ? error instanceof Error ? error.message : 'Unknown error'
            : 'Internal server error',
        },
        { status: 500 }
      );
    }
  };
};

/**
 * Success response helper
 */
export const createResponse = <T>(
  data: T,
  status = 200,
  message?: string
): NextResponse => {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
};

/**
 * Error response helper
 */
export const createErrorResponse = (
  error: string,
  status = 400,
  code?: string
): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
    },
    { status }
  );
};
