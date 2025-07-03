import { useState, useEffect, useCallback } from 'react';

// Types
interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: string;
  vendor?: string;
  productType?: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  images: Array<{
    id: string;
    url: string;
    altText?: string;
    width: number;
    height: number;
    position: number;
  }>;
  variants: Array<{
    id: string;
    title: string;
    sku?: string;
    price: number;
    compareAtPrice?: number;
    inventory: number;
    weight?: number;
    weightUnit: string;
    taxable: boolean;
    barcode?: string;
    options: Record<string, string>;
  }>;
  reviews?: Array<{
    id: string;
    rating: number;
    title?: string;
    content?: string;
    verified: boolean;
    helpful: number;
    status: string;
    createdAt: string;
    user: {
      firstName: string;
      lastName: string;
    };
  }>;
  averageRating?: number;
  reviewCount?: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  page: number;
  limit: number;
}

interface UseProductsOptions {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  vendor?: string;
  tags?: string[];
  inStock?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  initialLoad?: boolean;
}

// Custom hook for managing products
export function useProducts(options: UseProductsOptions = {}) {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: false,
    error: null,
    hasMore: true,
    total: 0,
    page: 1,
    limit: options.limit || 20,
  });

  // Build query string from options
  const buildQueryString = useCallback((page: number = 1) => {
    const params = new URLSearchParams();
    
    params.set('page', page.toString());
    params.set('limit', state.limit.toString());
    
    if (options.category) params.set('category', options.category);
    if (options.priceMin !== undefined) params.set('priceMin', options.priceMin.toString());
    if (options.priceMax !== undefined) params.set('priceMax', options.priceMax.toString());
    if (options.vendor) params.set('vendor', options.vendor);
    if (options.tags && options.tags.length > 0) params.set('tags', options.tags.join(','));
    if (options.inStock !== undefined) params.set('inStock', options.inStock.toString());
    if (options.sortBy) params.set('sortBy', options.sortBy);
    if (options.sortOrder) params.set('sortOrder', options.sortOrder);
    
    return params.toString();
  }, [options, state.limit]);

  // Fetch products
  const fetchProducts = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const queryString = buildQueryString(page);
      const response = await fetch(`/api/products?${queryString}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch products');
      }
      
      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        products: append ? [...prev.products, ...data.products] : data.products,
        loading: false,
        hasMore: data.pagination.hasNext,
        total: data.pagination.totalCount,
        page: data.pagination.page,
      }));
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, [buildQueryString]);

  // Load more products (pagination)
  const loadMore = useCallback(async () => {
    if (state.hasMore && !state.loading) {
      await fetchProducts(state.page + 1, true);
    }
  }, [fetchProducts, state.hasMore, state.loading, state.page]);

  // Refresh products
  const refresh = useCallback(async () => {
    await fetchProducts(1, false);
  }, [fetchProducts]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial load
  useEffect(() => {
    if (options.initialLoad !== false) {
      fetchProducts(1, false);
    }
  }, [fetchProducts, options.initialLoad]);

  return {
    ...state,
    loadMore,
    refresh,
    clearError,
  };
}

// Custom hook for a single product
export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch product');
      }

      const data = await response.json();
      setProduct(data.product);
    } catch (error: any) {
      console.error('Error fetching product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const refresh = useCallback(() => {
    fetchProduct();
  }, [fetchProduct]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    product,
    loading,
    error,
    refresh,
    clearError,
  };
}

// Custom hook for product search
export function useProductSearch() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, options: Omit<UseProductsOptions, 'initialLoad'> = {}) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.set('q', query);
      params.set('limit', (options.limit || 10).toString());
      
      if (options.category) params.set('category', options.category);
      if (options.priceMin !== undefined) params.set('priceMin', options.priceMin.toString());
      if (options.priceMax !== undefined) params.set('priceMax', options.priceMax.toString());
      if (options.vendor) params.set('vendor', options.vendor);
      if (options.tags && options.tags.length > 0) params.set('tags', options.tags.join(','));
      if (options.inStock !== undefined) params.set('inStock', options.inStock.toString());

      const response = await fetch(`/api/products?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      setResults(data.products);
    } catch (error: any) {
      console.error('Error searching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  };
}

// Custom hook for product reviews
export function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<Product['reviews']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {} as Record<number, number>,
  });

  const fetchReviews = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/reviews?productId=${productId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data.reviews);
      setStats(data.stats);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const submitReview = useCallback(async (review: {
    rating: number;
    title?: string;
    content?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          ...review,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      // Refresh reviews after submission
      await fetchReviews();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [productId, fetchReviews]);

  return {
    reviews: reviews || [],
    stats,
    loading,
    error,
    submitReview,
    refresh: fetchReviews,
  };
}
