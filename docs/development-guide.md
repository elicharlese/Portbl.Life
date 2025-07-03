# Development Guide

## Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database
- Redis (optional, for caching)
- Git

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/elicharlese/Portbl.Life.git
cd Portbl.Life
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Configuration
Copy the example environment file and configure your settings:
```bash
cp .env.local.example .env.local
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `SOLANA_RPC_URL` - Solana RPC endpoint

### 4. Database Setup
```bash
# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed the database with sample data
pnpm db:seed
```

### 5. Start Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Development Workflow

### 1. Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

### 2. Code Style
The project uses Prettier and ESLint for code formatting:
```bash
# Format code
pnpm format

# Check formatting
pnpm format:check

# Lint code
pnpm lint
```

### 3. Type Checking
```bash
# Run TypeScript type checking
pnpm type-check
```

### 4. Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Database Development

### 1. Schema Changes
When modifying the database schema:

1. Update `prisma/schema.prisma`
2. Create migration: `pnpm db:migrate`
3. Generate Prisma client: `pnpm db:generate`

### 2. Database Reset
To reset the database with fresh data:
```bash
# Reset database and reseed
npx prisma migrate reset
pnpm db:seed
```

### 3. Database Studio
Prisma Studio provides a visual interface for your database:
```bash
npx prisma studio
```

## API Development

### 1. Creating New Endpoints
API routes are located in `app/api/`. Follow the existing pattern:

```typescript
// app/api/example/route.ts
import { NextRequest } from 'next/server';
import { withErrorHandling, createResponse } from '@/lib/errors';
import { withMethods } from '@/lib/middleware';

async function handler(req: NextRequest) {
  // Your logic here
  return createResponse({ message: 'Success' });
}

export const GET = withErrorHandling(withMethods(['GET'])(handler));
```

### 2. Validation
Use Zod schemas for request validation:

```typescript
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const data = schema.parse(await req.json());
```

### 3. Authentication
Protect routes with authentication middleware:

```typescript
import { withAuth } from '@/lib/middleware';

export const GET = withErrorHandling(withAuth(handler));
```

## Frontend Development

### 1. Component Structure
Components are organized by feature:
```
components/
├── ui/           # Reusable UI components
├── auth/         # Authentication components
├── products/     # Product-related components
├── cart/         # Cart components
└── layout/       # Layout components
```

### 2. State Management
Use React Context for global state:

```typescript
// hooks/useCart.tsx
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

### 3. API Integration
Use custom hooks for API calls:

```typescript
// hooks/useProducts.ts
export const useProducts = (filters: ProductFilters) => {
  return useSWR(`/api/products?${new URLSearchParams(filters)}`, fetcher);
};
```

## Testing Strategy

### 1. Unit Tests
Test individual functions and components:

```typescript
// __tests__/lib/utils.test.ts
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(10.99)).toBe('$10.99');
  });
});
```

### 2. Integration Tests
Test API endpoints:

```typescript
// __tests__/api/products.test.ts
import { GET } from '@/app/api/products/route';

describe('/api/products', () => {
  it('returns products list', async () => {
    const req = new NextRequest('http://localhost/api/products');
    const response = await GET(req);
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data.products)).toBe(true);
  });
});
```

### 3. E2E Tests
Test complete user flows with Cypress or Playwright.

## Performance Optimization

### 1. Database Queries
- Use Prisma's `include` and `select` to fetch only needed data
- Implement proper indexing
- Use database connection pooling

### 2. API Responses
- Implement pagination for large datasets
- Use appropriate HTTP caching headers
- Compress responses with gzip

### 3. Frontend Optimization
- Use Next.js Image component for optimized images
- Implement code splitting
- Use React.memo for expensive components

## Debugging

### 1. Database Queries
Enable Prisma query logging:
```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### 2. API Debugging
Use the Network tab in browser dev tools or tools like Postman.

### 3. Error Tracking
Errors are logged to console in development. In production, use services like Sentry.

## Common Tasks

### 1. Adding a New Product Field
1. Update Prisma schema
2. Create and run migration
3. Update TypeScript types
4. Update API endpoints
5. Update frontend components

### 2. Adding a New Payment Method
1. Create payment service in `lib/`
2. Add API routes in `app/api/payments/`
3. Update order processing logic
4. Add frontend payment component

### 3. Adding New Middleware
1. Create middleware function in `lib/middleware.ts`
2. Compose with existing middleware
3. Apply to relevant API routes

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check DATABASE_URL in .env.local
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **Build Errors**
   - Run `pnpm type-check` to identify TypeScript errors
   - Ensure all dependencies are installed
   - Check for syntax errors in recent changes

3. **Authentication Issues**
   - Verify Supabase configuration
   - Check JWT token expiration
   - Ensure proper middleware setup

4. **Payment Issues**
   - Verify Stripe/Solana credentials
   - Check webhook endpoints
   - Monitor payment logs

### Getting Help

- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review error logs in development console
- Check GitHub issues for similar problems
- Contact the development team
