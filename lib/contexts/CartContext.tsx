import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

// Types
interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  product: {
    title: string;
    slug: string;
    image?: string;
  };
  variant: {
    title: string;
    options: Record<string, string>;
  };
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  subtotal: number;
  itemCount: number;
}

interface CartContextType extends CartState {
  addItem: (productId: string, variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  clearError: () => void;
}

// Action types
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { variantId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_ITEMS' };

// Helper functions
const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  subtotal: 0,
  itemCount: 0,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ITEMS': {
      const items = action.payload;
      return {
        ...state,
        items,
        subtotal: calculateSubtotal(items),
        itemCount: calculateItemCount(items),
        loading: false,
        error: null,
      };
    }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.variantId === action.payload.variantId
      );
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, action.payload];
      }
      
      return {
        ...state,
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case 'UPDATE_ITEM': {
      const newItems = state.items.map(item =>
        item.variantId === action.payload.variantId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      return {
        ...state,
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.variantId !== action.payload);
      return {
        ...state,
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }
    
    case 'CLEAR_ITEMS':
      return {
        ...state,
        items: [],
        subtotal: 0,
        itemCount: 0,
      };
    
    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | null>(null);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Load cart on mount and when user changes
  useEffect(() => {
    loadCart();
  }, [user]);

  // API functions
  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': user ? `Bearer ${await getAccessToken()}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_ITEMS', payload: data.items || [] });
      } else if (response.status === 401) {
        // Not authenticated, load from localStorage
        loadLocalCart();
      } else {
        throw new Error('Failed to load cart');
      }
    } catch (error: any) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      // Fallback to localStorage
      loadLocalCart();
    }
  };

  const loadLocalCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_ITEMS', payload: cartData.items || [] });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: [] });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      dispatch({ type: 'SET_ITEMS', payload: [] });
    }
  };

  const saveLocalCart = (items: CartItem[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify({ items }));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const getAccessToken = async (): Promise<string> => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || '';
  };

  // Cart actions
  const addItem = async (productId: string, variantId: string, quantity: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Authorization': user ? `Bearer ${await getAccessToken()}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          variantId,
          quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'ADD_ITEM', payload: data.item });
        
        // Also save to localStorage for persistence
        const newItems = [...state.items];
        const existingIndex = newItems.findIndex(item => item.variantId === variantId);
        if (existingIndex >= 0 && newItems[existingIndex]) {
          newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity + quantity };
        } else {
          newItems.push(data.item);
        }
        saveLocalCart(newItems);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add item to cart');
      }
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      if (quantity <= 0) {
        await removeItem(variantId);
        return;
      }

      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Authorization': user ? `Bearer ${await getAccessToken()}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId,
          quantity,
        }),
      });

      if (response.ok) {
        dispatch({ type: 'UPDATE_ITEM', payload: { variantId, quantity } });
        
        // Update localStorage
        const newItems = state.items.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        );
        saveLocalCart(newItems);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update cart item');
      }
    } catch (error: any) {
      console.error('Error updating cart item:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeItem = async (variantId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await fetch(`/api/cart?variantId=${variantId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': user ? `Bearer ${await getAccessToken()}` : '',
        },
      });

      if (response.ok) {
        dispatch({ type: 'REMOVE_ITEM', payload: variantId });
        
        // Update localStorage
        const newItems = state.items.filter(item => item.variantId !== variantId);
        saveLocalCart(newItems);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove cart item');
      }
    } catch (error: any) {
      console.error('Error removing cart item:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      if (user) {
        const response = await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${await getAccessToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to clear cart');
        }
      }

      dispatch({ type: 'CLEAR_ITEMS' });
      localStorage.removeItem('cart');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: CartContextType = {
    ...state,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
    clearError,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}
