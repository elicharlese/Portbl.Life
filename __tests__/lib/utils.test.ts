import { prisma } from '@/lib/prisma';
import { generateOrderNumber, formatCurrency, calculateTax, calculateShipping } from '@/lib/utils/index';

describe('Utility Functions', () => {
  describe('generateOrderNumber', () => {
    it('should generate a valid order number', () => {
      const orderNumber = generateOrderNumber();
      expect(orderNumber).toMatch(/^ORD-[a-z0-9]+-[A-Z0-9]{6}$/);
    });

    it('should generate unique order numbers', () => {
      const orderNumber1 = generateOrderNumber();
      const orderNumber2 = generateOrderNumber();
      expect(orderNumber1).not.toBe(orderNumber2);
    });
  });

  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(formatCurrency(10.99)).toBe('$10.99');
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format different currencies', () => {
      expect(formatCurrency(10.99, 'EUR', 'en-US')).toBe('€10.99');
      expect(formatCurrency(10.99, 'GBP', 'en-US')).toBe('£10.99');
    });
  });

  describe('calculateTax', () => {
    it('should calculate tax correctly', () => {
      expect(calculateTax(100)).toBe(8); // 8% default rate
      expect(calculateTax(100, 0.1)).toBe(10); // 10% custom rate
      expect(calculateTax(0)).toBe(0);
    });
  });

  describe('calculateShipping', () => {
    it('should return free shipping for orders over $100', () => {
      expect(calculateShipping(150)).toBe(0);
      expect(calculateShipping(100)).toBe(0);
    });

    it('should calculate shipping for orders under $100', () => {
      expect(calculateShipping(50, 'standard')).toBe(5.99);
      expect(calculateShipping(50, 'expedited')).toBe(12.99);
      expect(calculateShipping(50, 'overnight')).toBe(24.99);
    });
  });
});

describe('Database Operations', () => {
  beforeEach(async () => {
    // Clean up test data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.review.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.address.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    // Clean up after tests
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.review.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.address.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('User Operations', () => {
    it('should create a user', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'USER',
        },
      });

      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe('USER');
    });

    it('should not allow duplicate emails', async () => {
      await prisma.user.create({
        data: {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'USER',
        },
      });

      await expect(
        prisma.user.create({
          data: {
            email: 'test@example.com',
            firstName: 'Test2',
            lastName: 'User2',
            role: 'USER',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('Product Operations', () => {
    it('should create a product with variants', async () => {
      const product = await prisma.product.create({
        data: {
          title: 'Test Product',
          slug: 'test-product',
          handle: 'test-product',
          status: 'ACTIVE',
          variants: {
            create: [
              {
                title: 'Default Variant',
                price: 29.99,
                inventory: 10,
              },
            ],
          },
        },
        include: {
          variants: true,
        },
      });

      expect(product.title).toBe('Test Product');
      expect(product.variants).toHaveLength(1);
      expect(product.variants[0].price).toEqual(29.99);
    });
  });

  describe('Order Operations', () => {
    it('should create an order with items', async () => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'USER',
        },
      });

      // Create product
      const product = await prisma.product.create({
        data: {
          title: 'Test Product',
          slug: 'test-product',
          handle: 'test-product',
          status: 'ACTIVE',
          variants: {
            create: {
              title: 'Default Variant',
              price: 29.99,
              inventory: 10,
            },
          },
        },
        include: {
          variants: true,
        },
      });

      // Create addresses
      const address = await prisma.address.create({
        data: {
          userId: user.id,
          type: 'SHIPPING',
          firstName: 'Test',
          lastName: 'User',
          address1: '123 Test St',
          city: 'Test City',
          state: 'TS',
          postalCode: '12345',
          country: 'US',
        },
      });

      // Create order
      const order = await prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: user.id,
          email: user.email,
          subtotal: 29.99,
          tax: 2.40,
          shipping: 5.99,
          total: 38.38,
          shippingAddressId: address.id,
          billingAddressId: address.id,
          shippingMethod: 'standard',
          paymentMethod: 'STRIPE',
          items: {
            create: {
              productId: product.id,
              variantId: product.variants[0].id,
              quantity: 1,
              price: 29.99,
              title: product.title,
              variantTitle: product.variants[0].title,
            },
          },
        },
        include: {
          items: true,
        },
      });

      expect(order.total).toEqual(38.38);
      expect(order.items).toHaveLength(1);
      expect(order.items[0].quantity).toBe(1);
    });
  });
});
