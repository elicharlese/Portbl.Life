import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Types
interface WishlistItem {
  id: string;
  product: {
    id: string;
    title: string;
    slug: string;
    description?: string;
    image?: string;
    price?: number;
    compareAtPrice?: number;
  };
  addedAt: string;
}

// Custom hook for wishlist management
export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/users/wishlist', {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch wishlist');
      }

      const data = await response.json();
      setItems(data.wishlist);
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = useCallback(async (productId: string) => {
    if (!user) {
      throw new Error('You must be logged in to add items to wishlist');
    }

    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/users/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to wishlist');
      }

      const data = await response.json();
      
      // Add the new item to the local state
      setItems(prev => [data.item, ...prev]);
      
      return data.item;
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (!user) {
      throw new Error('You must be logged in to remove items from wishlist');
    }

    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`/api/users/wishlist?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove from wishlist');
      }

      // Remove the item from local state
      setItems(prev => prev.filter(item => item.product.id !== productId));
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(item => item.product.id === productId);
  }, [items]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    refresh: fetchWishlist,
    clearError,
    count: items.length,
  };
}
