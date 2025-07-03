export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  type: 'shipping' | 'billing';
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
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  handle: string;
  status: 'active' | 'draft' | 'archived';
  vendor?: string;
  productType?: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  seo?: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
  position: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  weight?: number;
  weightUnit?: 'kg' | 'lb';
  taxable: boolean;
  barcode?: string;
  options: Record<string, string>;
  image?: ProductImage;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description?: string;
  handle: string;
  image?: string;
  published: boolean;
  sortOrder?: 'manual' | 'best-selling' | 'created' | 'price-asc' | 'price-desc';
  seo?: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  product: Product;
  variant: ProductVariant;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  email: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  paymentMethod: 'stripe' | 'crypto';
  paymentDetails?: any;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  title: string;
  variantTitle: string;
  image?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  content?: string;
  verified: boolean;
  helpful: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  user: Pick<User, 'id' | 'firstName' | 'lastName'>;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
}

export interface SolanaPayment {
  id: string;
  orderId: string;
  walletAddress: string;
  amount: number;
  currency: 'SOL' | 'USDC' | 'BTC' | 'ETH';
  status: 'pending' | 'confirming' | 'confirmed' | 'failed';
  transactionHash?: string;
  blockHeight?: number;
  createdAt: Date;
  updatedAt: Date;
}
