import { PrismaClient } from '@prisma/client';
import { generateSlug, hashPassword } from '@/lib/utils/index';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@portbl.life' },
    update: {},
    create: {
      email: 'admin@portbl.life',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  console.log('✅ Created admin user');

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      emailVerified: true,
    },
  });

  console.log('✅ Created test user');

  // Create collections
  const collections = [
    {
      title: 'Best Sellers',
      slug: 'best-sellers',
      handle: 'best-sellers',
      description: 'Our most popular products',
      published: true,
    },
    {
      title: 'New Arrivals',
      slug: 'new-arrivals',
      handle: 'new-arrivals',
      description: 'Latest products in our catalog',
      published: true,
    },
    {
      title: 'Apparel',
      slug: 'apparel',
      handle: 'apparel',
      description: 'Clothing and accessories',
      published: true,
    },
    {
      title: 'Tech',
      slug: 'tech',
      handle: 'tech',
      description: 'Technology and gadgets',
      published: true,
    },
    {
      title: 'Backpacks',
      slug: 'backpacks',
      handle: 'backpacks',
      description: 'Bags and backpacks for every occasion',
      published: true,
    },
  ];

  const createdCollections = [];
  for (const collection of collections) {
    const created = await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: {},
      create: collection,
    });
    createdCollections.push(created);
  }

  console.log('✅ Created collections');

  // Create sample products
  const products = [
    {
      title: 'Premium Laptop Backpack',
      description: 'Durable laptop backpack with multiple compartments and water-resistant material.',
      handle: 'premium-laptop-backpack',
      status: 'ACTIVE' as const,
      vendor: 'TechGear',
      productType: 'Backpack',
      tags: ['backpack', 'laptop', 'travel', 'waterproof'],
      variants: [
        {
          title: 'Black / 15-inch',
          price: 89.99,
          inventory: 50,
          options: { color: 'Black', size: '15-inch' },
        },
        {
          title: 'Gray / 15-inch',
          price: 89.99,
          inventory: 30,
          options: { color: 'Gray', size: '15-inch' },
        },
        {
          title: 'Black / 17-inch',
          price: 99.99,
          inventory: 25,
          options: { color: 'Black', size: '17-inch' },
        },
      ],
    },
    {
      title: 'Organic Cotton T-Shirt',
      description: 'Comfortable organic cotton t-shirt in various colors.',
      handle: 'organic-cotton-tshirt',
      status: 'ACTIVE' as const,
      vendor: 'EcoWear',
      productType: 'Apparel',
      tags: ['organic', 'cotton', 'tshirt', 'sustainable'],
      variants: [
        {
          title: 'White / Small',
          price: 24.99,
          inventory: 100,
          options: { color: 'White', size: 'Small' },
        },
        {
          title: 'White / Medium',
          price: 24.99,
          inventory: 100,
          options: { color: 'White', size: 'Medium' },
        },
        {
          title: 'Black / Small',
          price: 24.99,
          inventory: 75,
          options: { color: 'Black', size: 'Small' },
        },
        {
          title: 'Black / Medium',
          price: 24.99,
          inventory: 75,
          options: { color: 'Black', size: 'Medium' },
        },
      ],
    },
    {
      title: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      handle: 'wireless-bluetooth-headphones',
      status: 'ACTIVE' as const,
      vendor: 'AudioTech',
      productType: 'Electronics',
      tags: ['wireless', 'bluetooth', 'headphones', 'audio'],
      variants: [
        {
          title: 'Black',
          price: 149.99,
          compareAtPrice: 199.99,
          inventory: 40,
          options: { color: 'Black' },
        },
        {
          title: 'White',
          price: 149.99,
          compareAtPrice: 199.99,
          inventory: 35,
          options: { color: 'White' },
        },
      ],
    },
    {
      title: 'Smart Water Bottle',
      description: 'Smart water bottle that tracks your hydration and keeps drinks at perfect temperature.',
      handle: 'smart-water-bottle',
      status: 'ACTIVE' as const,
      vendor: 'HydroTech',
      productType: 'Lifestyle',
      tags: ['smart', 'water', 'hydration', 'tech'],
      variants: [
        {
          title: '500ml / Blue',
          price: 79.99,
          inventory: 60,
          options: { capacity: '500ml', color: 'Blue' },
        },
        {
          title: '750ml / Blue',
          price: 89.99,
          inventory: 45,
          options: { capacity: '750ml', color: 'Blue' },
        },
        {
          title: '500ml / Black',
          price: 79.99,
          inventory: 55,
          options: { capacity: '500ml', color: 'Black' },
        },
      ],
    },
  ];

  const createdProducts = [];
  for (const productData of products) {
    const { variants, ...product } = productData;
    
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        slug: generateSlug(product.title),
        variants: {
          create: variants,
        },
      },
    });
    
    createdProducts.push(createdProduct);
  }

  console.log('✅ Created products');

  // Associate products with collections
  const productCollectionMappings = [
    // Best Sellers
    { productIndex: 0, collectionIndex: 0 }, // Laptop Backpack
    { productIndex: 2, collectionIndex: 0 }, // Headphones
    
    // New Arrivals
    { productIndex: 3, collectionIndex: 1 }, // Smart Water Bottle
    { productIndex: 1, collectionIndex: 1 }, // T-Shirt
    
    // Apparel
    { productIndex: 1, collectionIndex: 2 }, // T-Shirt
    
    // Tech
    { productIndex: 2, collectionIndex: 3 }, // Headphones
    { productIndex: 3, collectionIndex: 3 }, // Smart Water Bottle
    
    // Backpacks
    { productIndex: 0, collectionIndex: 4 }, // Laptop Backpack
  ];

  for (const mapping of productCollectionMappings) {
    await prisma.productCollection.create({
      data: {
        productId: createdProducts[mapping.productIndex].id,
        collectionId: createdCollections[mapping.collectionIndex].id,
      },
    });
  }

  console.log('✅ Associated products with collections');

  // Create sample reviews
  const reviews = [
    {
      productId: createdProducts[0].id,
      userId: testUser.id,
      rating: 5,
      title: 'Excellent quality!',
      content: 'This backpack is exactly what I needed. Great quality and plenty of space for my laptop and other items.',
      verified: true,
      status: 'APPROVED' as const,
    },
    {
      productId: createdProducts[1].id,
      userId: testUser.id,
      rating: 4,
      title: 'Very comfortable',
      content: 'Love the organic cotton material. Fits well and feels great.',
      verified: true,
      status: 'APPROVED' as const,
    },
    {
      productId: createdProducts[2].id,
      userId: testUser.id,
      rating: 5,
      title: 'Amazing sound quality',
      content: 'The noise cancellation is fantastic and the sound quality is superb. Highly recommend!',
      verified: true,
      status: 'APPROVED' as const,
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log('✅ Created sample reviews');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
