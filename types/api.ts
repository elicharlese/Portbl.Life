import { NextRequest } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export interface SearchParams {
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  vendor?: string;
  tags?: string[];
  inStock?: boolean;
}

export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  clientSecret?: string;
  status: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  createdAt: Date;
}

export interface AnalyticsEvent {
  event: string;
  userId?: string;
  sessionId: string;
  properties: Record<string, any>;
  timestamp: Date;
}
