# Deployment Guide

This guide covers deploying Portbl.Life to production using Vercel and Supabase.

## Prerequisites

- GitHub account with repository access
- Vercel account
- Supabase account
- Stripe account (for payments)
- Domain name (optional)

## 1. Database Setup (Supabase)

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a database password and region
3. Wait for the project to be created

### Configure Database

1. **Get connection details**:
   - Go to Settings → Database
   - Copy the connection string for Prisma
   - Note down the API URL and anon key

2. **Enable Row Level Security** (recommended):
   ```sql
   -- Enable RLS on sensitive tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
   
   -- Create policies
   CREATE POLICY "Users can view own data" ON users
     FOR SELECT USING (auth.uid() = id);
   
   CREATE POLICY "Users can update own data" ON users
     FOR UPDATE USING (auth.uid() = id);
   ```

3. **Run database migrations**:
   ```bash
   # Set DATABASE_URL in your environment
   export DATABASE_URL="your_supabase_connection_string"
   
   # Run migrations
   pnpm db:push
   pnpm db:seed
   ```

## 2. Vercel Deployment

### Connect Repository

1. Go to [vercel.com](https://vercel.com) and create an account
2. Click "New Project" and import your GitHub repository
3. Configure the project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`

### Environment Variables

Add the following environment variables in Vercel dashboard:

#### Required Variables
```env
# Database
DATABASE_URL=your_supabase_connection_string

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
NEXTAUTH_SECRET=your_32_character_secret
NEXTAUTH_URL=https://your-domain.vercel.app

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_or_pk_test
STRIPE_SECRET_KEY=sk_live_or_sk_test
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_DEVNET_RPC_URL=https://api.devnet.solana.com

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# App Configuration
APP_URL=https://your-domain.vercel.app
APP_NAME=Portbl.Life
```

#### Optional Variables
```env
# Redis (for caching)
REDIS_URL=your_redis_url

# Analytics
VERCEL_ANALYTICS_ID=your_analytics_id

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Deploy

1. Click "Deploy" to start the deployment
2. Wait for the build to complete
3. Test the deployment using the provided URL

## 3. Stripe Configuration

### Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`
4. Copy the webhook secret and add to environment variables

### Test Payments

1. Use Stripe test card numbers for testing:
   - Success: `4242424242424242`
   - Decline: `4000000000000002`
2. Test the complete checkout flow
3. Verify webhook events are received

## 4. Domain Configuration (Optional)

### Custom Domain

1. In Vercel dashboard, go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed
5. Update `APP_URL` environment variable

### SSL Certificate

- Vercel automatically provides SSL certificates
- Custom domains get certificates within minutes
- Verify HTTPS is working correctly

## 5. Monitoring and Analytics

### Error Monitoring

1. **Vercel Analytics**: Automatically enabled for performance monitoring
2. **Sentry** (optional):
   ```bash
   pnpm add @sentry/nextjs
   ```
   Configure in `next.config.mjs`:
   ```javascript
   const { withSentryConfig } = require('@sentry/nextjs');
   
   module.exports = withSentryConfig(nextConfig, {
     org: 'your-org',
     project: 'your-project',
   });
   ```

### Performance Monitoring

1. **Web Vitals**: Monitor Core Web Vitals in Vercel dashboard
2. **Database Performance**: Monitor in Supabase dashboard
3. **API Response Times**: Use Vercel Functions tab

## 6. Security Checklist

### Production Security

- [ ] Enable HTTPS everywhere
- [ ] Configure Content Security Policy
- [ ] Set up rate limiting
- [ ] Enable Row Level Security in Supabase
- [ ] Rotate secrets regularly
- [ ] Monitor for security vulnerabilities

### Environment Security

```javascript
// next.config.mjs
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## 7. Backup and Recovery

### Database Backups

1. **Supabase**: Automatic daily backups for paid plans
2. **Manual Backups**:
   ```bash
   # Export schema
   pg_dump --schema-only DATABASE_URL > schema.sql
   
   # Export data
   pg_dump --data-only DATABASE_URL > data.sql
   ```

### Code Backups

- GitHub automatically backs up your code
- Tag releases for easy rollback:
  ```bash
  git tag -a v1.0.0 -m "Release version 1.0.0"
  git push origin v1.0.0
  ```

## 8. Rollback Procedures

### Quick Rollback

1. **Vercel**: Go to deployments and click "Promote to Production" on a previous deployment
2. **Database**: Restore from Supabase backup if needed
3. **Environment Variables**: Revert any changed variables

### Database Migration Rollback

```bash
# If using Prisma migrations
npx prisma migrate reset

# Restore specific backup
psql DATABASE_URL < backup.sql
```

## 9. Performance Optimization

### Frontend Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Implement dynamic imports
3. **Caching**: Configure appropriate cache headers

### Backend Optimization

1. **Database Indexing**: Add indexes for frequently queried fields
2. **Connection Pooling**: Configure in Supabase
3. **API Caching**: Implement Redis caching

### CDN Configuration

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  }
}
```

## 10. Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check TypeScript errors
   - Verify environment variables
   - Check dependency versions

2. **Database Connection Issues**:
   - Verify DATABASE_URL format
   - Check Supabase project status
   - Ensure connection pooling is configured

3. **Payment Issues**:
   - Verify Stripe webhook URLs
   - Check webhook secret configuration
   - Test with Stripe CLI

### Debug Commands

```bash
# Check deployment logs
vercel logs your-project-url

# Test database connection
npx prisma db pull

# Verify environment variables
vercel env ls
```

## 11. Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Monitor error rates and performance
- [ ] Review and rotate secrets quarterly
- [ ] Update documentation
- [ ] Backup database regularly
- [ ] Monitor security advisories

### Health Monitoring

Set up monitoring for:
- API response times
- Database performance
- Error rates
- User activity
- Payment success rates

The deployment is now complete! Your Portbl.Life application should be running in production with all features enabled.
