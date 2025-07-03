# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with Portbl.Life.

## Quick Diagnosis Commands

```bash
# Check application health
curl https://your-domain.vercel.app/api/health

# View recent logs
vercel logs --follow

# Check database connectivity
npx prisma db pull

# Test Stripe webhook
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Common Issues

### 1. Build and Deployment Issues

#### TypeScript Compilation Errors

**Symptoms:**
- Build fails with TypeScript errors
- "Cannot find module" errors
- Type mismatch errors

**Solutions:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
pnpm add -D @types/node @types/react @types/react-dom
```

**Prevention:**
- Keep TypeScript strict mode enabled
- Regularly update type definitions
- Use proper import paths

#### Environment Variable Issues

**Symptoms:**
- "Environment variable not found" errors
- Features not working in production
- Authentication failures

**Diagnosis:**
```bash
# List environment variables
vercel env ls

# Check variable in build logs
echo $VARIABLE_NAME
```

**Solutions:**
1. Verify all required variables are set in Vercel dashboard
2. Check variable names match exactly (case-sensitive)
3. Ensure variables are available at build time vs runtime

#### Dependency Issues

**Symptoms:**
- Module resolution errors
- Version conflicts
- Missing dependencies

**Solutions:**
```bash
# Clear package manager cache
pnpm store prune

# Reinstall with exact versions
pnpm install --frozen-lockfile

# Check for peer dependency warnings
pnpm ls
```

### 2. Database Issues

#### Connection Problems

**Symptoms:**
- "Cannot connect to database" errors
- Timeout errors
- SSL/TLS connection issues

**Diagnosis:**
```bash
# Test database connection
npx prisma db pull

# Check connection string format
echo $DATABASE_URL
```

**Solutions:**
1. **SSL Configuration**:
   ```bash
   # Add SSL parameter to connection string
   DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"
   ```

2. **Connection Pooling**:
   ```javascript
   // lib/db.ts
   const prisma = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL + "?connection_limit=1"
       }
     }
   });
   ```

3. **Supabase Issues**:
   - Check project status in Supabase dashboard
   - Verify connection string format
   - Ensure project hasn't been paused

#### Migration Issues

**Symptoms:**
- Schema drift warnings
- Migration failures
- Database out of sync

**Solutions:**
```bash
# Reset database (CAUTION: data loss)
npx prisma migrate reset

# Force push schema
npx prisma db push --force-reset

# Generate new migration
npx prisma migrate dev --name fix-schema
```

#### Query Performance Issues

**Symptoms:**
- Slow API responses
- Database timeouts
- High resource usage

**Solutions:**
1. **Add Indexes**:
   ```prisma
   model Product {
     id    String @id @default(cuid())
     slug  String @unique
     name  String
     
     @@index([name])
     @@index([createdAt])
   }
   ```

2. **Optimize Queries**:
   ```javascript
   // Use select to limit fields
   const products = await prisma.product.findMany({
     select: {
       id: true,
       name: true,
       price: true,
     },
     take: 20,
   });
   ```

### 3. Authentication Issues

#### Supabase Auth Problems

**Symptoms:**
- Login failures
- Token expiration errors
- Session not persisting

**Diagnosis:**
```javascript
// Check auth status
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

**Solutions:**
1. **Configuration Issues**:
   ```javascript
   // Check Supabase configuration
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
     {
       auth: {
         persistSession: true,
         autoRefreshToken: true,
       }
     }
   );
   ```

2. **JWT Issues**:
   - Verify `NEXTAUTH_SECRET` is set
   - Check token expiration settings
   - Ensure consistent domain configuration

#### Middleware Problems

**Symptoms:**
- Unauthorized access to protected routes
- Middleware not executing
- Infinite redirects

**Solutions:**
```javascript
// middleware.ts - Debug version
export function middleware(request: NextRequest) {
  console.log('Middleware executing for:', request.nextUrl.pathname);
  
  // Check if path should be protected
  const isProtectedPath = request.nextUrl.pathname.startsWith('/account');
  
  if (isProtectedPath) {
    const token = request.cookies.get('sb-access-token');
    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }
  
  return NextResponse.next();
}
```

### 4. Payment Issues

#### Stripe Integration Problems

**Symptoms:**
- Payment failures
- Webhook not receiving events
- Currency/amount mismatches

**Diagnosis:**
```bash
# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check webhook deliveries in Stripe dashboard
# Verify webhook endpoint URL
```

**Solutions:**
1. **Webhook Configuration**:
   ```javascript
   // Verify webhook signature
   const sig = headers.get('stripe-signature')!;
   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
   
   try {
     const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
     console.log('Webhook verified:', event.type);
   } catch (err) {
     console.error('Webhook signature verification failed:', err);
   }
   ```

2. **Payment Intent Issues**:
   ```javascript
   // Ensure currency and amount are correct
   const paymentIntent = await stripe.paymentIntents.create({
     amount: Math.round(amount * 100), // Convert to cents
     currency: 'usd',
     metadata: {
       orderId: order.id,
     },
   });
   ```

#### Solana Payment Issues

**Symptoms:**
- Transaction verification failures
- Network connection issues
- Wallet connection problems

**Solutions:**
1. **Network Configuration**:
   ```javascript
   // Use appropriate RPC endpoint
   const connection = new Connection(
     process.env.NODE_ENV === 'production' 
       ? process.env.SOLANA_RPC_URL!
       : process.env.SOLANA_DEVNET_RPC_URL!
   );
   ```

2. **Transaction Verification**:
   ```javascript
   // Add retry logic
   const verifyTransaction = async (signature: string, retries = 3) => {
     for (let i = 0; i < retries; i++) {
       try {
         const transaction = await connection.getTransaction(signature);
         if (transaction) return transaction;
         await new Promise(resolve => setTimeout(resolve, 1000));
       } catch (error) {
         if (i === retries - 1) throw error;
       }
     }
   };
   ```

### 5. Performance Issues

#### Slow Page Loads

**Symptoms:**
- High Time to First Byte (TTFB)
- Large bundle sizes
- Slow API responses

**Solutions:**
1. **Code Splitting**:
   ```javascript
   // Use dynamic imports
   const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

2. **Image Optimization**:
   ```javascript
   // Use Next.js Image component
   import Image from 'next/image';
   
   <Image
     src="/product.jpg"
     alt="Product"
     width={300}
     height={300}
     priority={isAboveFold}
   />
   ```

3. **API Optimization**:
   ```javascript
   // Add response caching
   export async function GET() {
     const products = await getProducts();
     
     return NextResponse.json(products, {
       headers: {
         'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
       }
     });
   }
   ```

#### Memory Issues

**Symptoms:**
- Vercel function timeouts
- Out of memory errors
- Slow garbage collection

**Solutions:**
1. **Database Connection Management**:
   ```javascript
   // Use connection pooling
   const prisma = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL + "?connection_limit=10"
       }
     }
   });
   ```

2. **Memory Optimization**:
   ```javascript
   // Stream large responses
   export async function GET() {
     const stream = new ReadableStream({
       start(controller) {
         // Process data in chunks
       }
     });
     
     return new Response(stream);
   }
   ```

### 6. Email Issues

#### SMTP Configuration Problems

**Symptoms:**
- Emails not sending
- Authentication failures
- Connection timeouts

**Solutions:**
1. **Gmail Configuration**:
   ```javascript
   // Use app-specific password
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS, // App password, not regular password
     },
   });
   ```

2. **Alternative Providers**:
   ```javascript
   // SendGrid example
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   ```

### 7. Error Monitoring

#### Setting Up Error Tracking

**Sentry Integration**:
```bash
# Install Sentry
pnpm add @sentry/nextjs

# Configure in next.config.mjs
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(nextConfig, {
  org: 'your-org',
  project: 'portbl-life',
});
```

#### Custom Error Boundaries

```javascript
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## Debugging Tools

### Development Tools

```bash
# Enable debug mode
DEBUG=* npm run dev

# Prisma debug
DEBUG="prisma:*" npm run dev

# Next.js debug
DEBUG="next:*" npm run dev
```

### Production Debugging

```bash
# View real-time logs
vercel logs --follow

# Download logs
vercel logs > logs.txt

# Check function performance
vercel inspect
```

### Database Debugging

```bash
# Check database schema
npx prisma db pull

# Validate schema
npx prisma validate

# Check migrations
npx prisma migrate status
```

## Health Checks

### API Health Check

```bash
# Basic health check
curl https://your-domain.vercel.app/api/health

# Detailed health check with auth
curl -H "Authorization: Bearer $TOKEN" \
     https://your-domain.vercel.app/api/health?detailed=true
```

### Database Health Check

```javascript
// Check database connectivity
const healthCheck = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy' };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
};
```

## Getting Help

### When to Contact Support

- Persistent Vercel deployment issues
- Supabase database problems
- Stripe payment gateway issues
- Security vulnerabilities

### Information to Provide

1. **Error Details**:
   - Exact error message
   - Stack trace
   - Steps to reproduce

2. **Environment Information**:
   - Node.js version
   - Next.js version
   - Browser (if frontend issue)
   - Operating system

3. **Logs**:
   - Vercel function logs
   - Browser console errors
   - Network request details

### Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

Remember to check the [GitHub Issues](https://github.com/your-org/portbl-life/issues) for known problems and solutions.
