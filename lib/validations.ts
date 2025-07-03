import { z } from 'zod';

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

// Address schemas
export const addressSchema = z.object({
  type: z.enum(['shipping', 'billing']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
});

// Product schemas
export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  handle: z.string().min(1, 'Handle is required'),
  status: z.enum(['active', 'draft', 'archived']).default('draft'),
  vendor: z.string().optional(),
  productType: z.string().optional(),
  tags: z.array(z.string()).default([]),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const productVariantSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sku: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  compareAtPrice: z.number().min(0).optional(),
  inventory: z.number().int().min(0, 'Inventory must be non-negative'),
  weight: z.number().min(0).optional(),
  weightUnit: z.enum(['kg', 'lb']).default('lb'),
  taxable: z.boolean().default(true),
  barcode: z.string().optional(),
  options: z.record(z.string()).default({}),
});

// Cart schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  variantId: z.string().min(1, 'Variant ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be non-negative'),
});

// Order schemas
export const createOrderSchema = z.object({
  email: z.string().email('Invalid email address'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  paymentMethod: z.enum(['stripe', 'crypto']),
  paymentDetails: z.any().optional(),
  notes: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Review schemas
export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().optional(),
  content: z.string().optional(),
});

export const updateReviewSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

// Search schemas
export const searchSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const productSearchSchema = searchSchema.extend({
  category: z.string().optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  vendor: z.string().optional(),
  tags: z.array(z.string()).or(z.string().transform(s => [s])).optional(),
  inStock: z.coerce.boolean().optional(),
});

// Payment schemas
export const stripePaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment intent ID is required'),
  amount: z.number().min(0, 'Amount must be positive'),
});

export const cryptoPaymentSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  currency: z.enum(['SOL', 'USDC', 'BTC', 'ETH']),
  transactionHash: z.string().optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Wishlist schemas
export const wishlistSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
});

// ID validation
export const idSchema = z.string().min(1, 'ID is required');
