import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';
import { config } from '@/lib/config';
import { AuthenticationError, AuthorizationError } from '@/lib/errors';
import type { AuthenticatedRequest } from '@/types/api';

/**
 * Rate limiting store
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware
 */
export const withRateLimit = (
  maxRequests = config.rateLimit.max,
  windowMs = config.rateLimit.window
) => {
  return (handler: Function) => {
    return async (req: NextRequest, ...args: any[]) => {
      const identifier = getClientIdentifier(req);
      const now = Date.now();
      const windowStart = now - windowMs;

      // Clean up old entries
      for (const [key, value] of rateLimitStore.entries()) {
        if (value.resetTime < windowStart) {
          rateLimitStore.delete(key);
        }
      }

      const current = rateLimitStore.get(identifier) || { count: 0, resetTime: now + windowMs };

      if (current.count >= maxRequests) {
        throw new Error('Rate limit exceeded');
      }

      current.count++;
      rateLimitStore.set(identifier, current);

      return handler(req, ...args);
    };
  };
};

/**
 * Authentication middleware
 */
export const withAuth = (handler: Function) => {
  return async (req: AuthenticatedRequest, ...args: any[]) => {
    const token = getAuthToken(req);
    
    if (!token) {
      throw new AuthenticationError();
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, config.auth.secret) as any;
      
      // Get user from Supabase
      const { data: user, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        throw new AuthenticationError('Invalid token');
      }

      // Attach user to request
      req.user = {
        id: user.user.id,
        email: user.user.email!,
        role: user.user.user_metadata?.role || 'user',
      };

      return handler(req, ...args);
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }
  };
};

/**
 * Authorization middleware
 */
export const withAuthorization = (roles: string[] = []) => {
  return (handler: Function) => {
    return withAuth(async (req: AuthenticatedRequest, ...args: any[]) => {
      if (!req.user) {
        throw new AuthenticationError();
      }

      if (roles.length > 0 && !roles.includes(req.user.role)) {
        throw new AuthorizationError();
      }

      return handler(req, ...args);
    });
  };
};

/**
 * Admin authorization middleware
 */
export const withAdminAuth = (handler: Function) => {
  return withAuthorization(['admin'])(handler);
};

/**
 * CORS middleware
 */
export const withCors = (
  origins: string[] = [config.app.url],
  methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
) => {
  return (handler: Function) => {
    return async (req: NextRequest, ...args: any[]) => {
      const origin = req.headers.get('origin');
      const isAllowedOrigin = origins.includes('*') || (origin && origins.includes(origin));

      const response = await handler(req, ...args);

      if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
      }
      
      response.headers.set('Access-Control-Allow-Methods', methods.join(', '));
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
      response.headers.set('Access-Control-Max-Age', '86400');

      return response;
    };
  };
};

/**
 * Method validation middleware
 */
export const withMethods = (allowedMethods: string[]) => {
  return (handler: Function) => {
    return async (req: NextRequest, ...args: any[]) => {
      if (!allowedMethods.includes(req.method)) {
        throw new Error(`Method ${req.method} not allowed`);
      }

      return handler(req, ...args);
    };
  };
};

/**
 * Combine multiple middlewares
 */
export const withMiddleware = (...middlewares: Array<(handler: Function) => Function>) => {
  return (handler: Function) => {
    return middlewares.reduce((wrapped, middleware) => middleware(wrapped), handler);
  };
};

/**
 * Simple request validation function
 */
export const validateRequest = async (req: NextRequest) => {
  const token = getAuthToken(req);
  
  if (!token) {
    return { isValid: false, user: null };
  }

  try {
    // Get user from Supabase
    const { data: user, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return { isValid: false, user: null };
    }

    return {
      isValid: true,
      user: {
        id: user.user.id,
        email: user.user.email!,
        role: user.user.user_metadata?.role || 'user',
      },
    };
  } catch (error) {
    return { isValid: false, user: null };
  }
};

// Helper functions
const getClientIdentifier = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return `${ip}-${userAgent}`;
};

const getAuthToken = (req: NextRequest): string | null => {
  const authHeader = req.headers.get('authorization');
  
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Also check cookies for browser requests
  const cookieToken = req.cookies.get('sb-access-token')?.value;
  return cookieToken || null;
};
