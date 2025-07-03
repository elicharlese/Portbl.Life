import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Types
interface Order {
  id: string;
  orderNumber: string;
  email: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  fulfillmentStatus: 'UNFULFILLED' | 'PARTIAL' | 'FULFILLED';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingMethod: string;
  paymentMethod: 'STRIPE' | 'CRYPTO';
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    title: string;
    variantTitle: string;
    image?: string;
  }>;
}

interface CreateOrderData {
  email: string;
  shippingAddress: Omit<Order['shippingAddress'], 'id'>;
  billingAddress: Omit<Order['billingAddress'], 'id'>;
  shippingMethod: string;
  paymentMethod: 'stripe' | 'crypto';
  paymentDetails?: any;
  notes?: string;
}

interface OrderTracking {
  order: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    fulfillmentStatus: string;
    trackingNumber?: string;
    shippingMethod: string;
    createdAt: string;
    estimatedDelivery?: string;
    shippingAddress: Order['shippingAddress'];
    items: Order['items'];
  };
  tracking: {
    events: Array<{
      status: string;
      description: string;
      timestamp: string;
      location: string;
    }>;
    currentStatus: string;
    isDelivered: boolean;
  };
}

// Custom hook for user orders
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = useCallback(async (orderData: CreateOrderData): Promise<Order> => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      
      // Refresh orders list
      await fetchOrders();
      
      return data.order;
    } catch (error: any) {
      console.error('Error creating order:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  const refresh = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    refresh,
    clearError,
  };
}

// Custom hook for single order tracking
export function useOrderTracking(orderId: string) {
  const [tracking, setTracking] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTracking = useCallback(async () => {
    if (!orderId || !user) return;

    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`/api/orders/${orderId}/tracking`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tracking information');
      }

      const data = await response.json();
      setTracking(data);
    } catch (error: any) {
      console.error('Error fetching order tracking:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [orderId, user]);

  useEffect(() => {
    fetchTracking();
  }, [fetchTracking]);

  const refresh = useCallback(() => {
    fetchTracking();
  }, [fetchTracking]);

  return {
    tracking,
    loading,
    error,
    refresh,
  };
}

// Custom hook for checkout process
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingRates, setShippingRates] = useState<Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
  }>>([]);

  // Calculate shipping rates
  const calculateShipping = useCallback(async (address: Partial<Order['shippingAddress']>) => {
    try {
      setLoading(true);
      setError(null);

      // For now, return mock shipping rates
      // In a real implementation, this would call shipping APIs
      const mockRates = [
        {
          id: 'standard',
          name: 'Standard Shipping',
          description: 'Standard delivery',
          price: 5.99,
          estimatedDays: '5-7 business days',
        },
        {
          id: 'expedited',
          name: 'Expedited Shipping',
          description: 'Faster delivery',
          price: 12.99,
          estimatedDays: '2-3 business days',
        },
        {
          id: 'overnight',
          name: 'Overnight Shipping',
          description: 'Next day delivery',
          price: 24.99,
          estimatedDays: '1 business day',
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setShippingRates(mockRates);
    } catch (error: any) {
      console.error('Error calculating shipping:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Process payment with Stripe
  const processStripePayment = useCallback(async (paymentIntentId: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          amount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error processing Stripe payment:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Process crypto payment
  const processCryptoPayment = useCallback(async (paymentData: {
    walletAddress: string;
    amount: number;
    currency: 'SOL' | 'USDC' | 'BTC' | 'ETH';
    transactionHash?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/payments/crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Crypto payment failed');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error processing crypto payment:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    shippingRates,
    calculateShipping,
    processStripePayment,
    processCryptoPayment,
    clearError,
  };
}
