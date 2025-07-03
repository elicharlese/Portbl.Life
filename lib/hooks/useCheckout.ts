import { useState, useCallback } from 'react';

interface CheckoutState {
  loading: boolean;
  error: string | null;
}

interface OrderData {
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: any;
  paymentMethod: 'stripe' | 'crypto';
  subtotal: number;
  shipping: number;
  total: number;
}

interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  transactionId?: string;
  error?: string;
}

export function useCheckout() {
  const [state, setState] = useState<CheckoutState>({
    loading: false,
    error: null,
  });

  const createStripePaymentIntent = useCallback(async (
    amount: number, 
    orderData: OrderData
  ): Promise<PaymentResult> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch('/api/payments/stripe/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency: 'usd',
          orderData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const data = await response.json();
      
      return {
        success: true,
        paymentIntentId: data.paymentIntentId,
      };
    } catch (error: any) {
      console.error('Stripe payment creation failed:', error);
      setState(prev => ({ ...prev, error: error.message }));
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const createSolanaPayment = useCallback(async (
    amount: number, 
    orderData: OrderData
  ): Promise<PaymentResult> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch('/api/payments/solana/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          orderData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Solana payment');
      }

      const data = await response.json();
      
      return {
        success: true,
        transactionId: data.transactionId,
      };
    } catch (error: any) {
      console.error('Solana payment creation failed:', error);
      setState(prev => ({ ...prev, error: error.message }));
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const confirmOrder = useCallback(async (orderData: OrderData & { 
    paymentIntentId: string 
  }): Promise<string> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      return data.orderId;
    } catch (error: any) {
      console.error('Order confirmation failed:', error);
      setState(prev => ({ ...prev, error: error.message }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    createStripePaymentIntent,
    createSolanaPayment,
    confirmOrder,
    clearError,
  };
}
