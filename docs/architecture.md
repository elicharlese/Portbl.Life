# Architecture Documentation

## System Overview

Portbl.Life is a modern e-commerce platform built with Next.js, featuring both traditional payment processing via Stripe and cryptocurrency payments through Solana blockchain integration.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js API) │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Supabase      │    │   Stripe API    │    │   Solana RPC    │
│   (Auth)        │    │   (Payments)    │    │   (Blockchain)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Components

### 1. Frontend Layer
- **Framework**: Next.js 15 with App Router
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: React Context and hooks
- **Authentication**: Supabase Auth integration

### 2. Backend API Layer
- **Framework**: Next.js API Routes
- **Middleware**: Authentication, authorization, rate limiting
- **Validation**: Zod schemas for type-safe validation
- **Error Handling**: Centralized error management

### 3. Data Layer
- **Database**: PostgreSQL
- **ORM**: Prisma with type generation
- **Caching**: Redis for session and cart data
- **File Storage**: Supabase Storage for images

### 4. External Services
- **Authentication**: Supabase Auth
- **Payments**: Stripe for traditional payments
- **Blockchain**: Solana for cryptocurrency payments
- **Email**: SMTP for transactional emails
- **Deployment**: Vercel hosting platform

## Design Patterns

### 1. Repository Pattern
Database operations are abstracted through Prisma ORM, providing a clean interface for data access.

### 2. Middleware Pattern
Request processing uses composable middleware functions for:
- Authentication verification
- Authorization checks
- Rate limiting
- Error handling
- Request validation

### 3. Factory Pattern
Payment processing uses factory pattern to handle different payment methods (Stripe, Crypto).

### 4. Observer Pattern
Webhook processing for order status updates and payment confirmations.

## Data Flow

### 1. User Authentication
```
User → Frontend → Supabase Auth → JWT Token → Backend Middleware → Protected Routes
```

### 2. Product Browsing
```
User → Frontend → API Routes → Prisma → PostgreSQL → Product Data → Frontend
```

### 3. Order Processing
```
User → Cart → Checkout → Payment Gateway → Order Creation → Inventory Update → Confirmation
```

### 4. Cryptocurrency Payments
```
User → Crypto Wallet → Solana Network → Transaction Verification → Order Confirmation
```

## Security Architecture

### 1. Authentication Flow
- JWT tokens for API authentication
- Refresh token rotation
- Session management via Supabase

### 2. Authorization
- Role-based access control (User, Admin)
- Resource-level permissions
- API endpoint protection

### 3. Data Protection
- Input validation and sanitization
- SQL injection prevention via Prisma
- XSS protection
- Rate limiting

### 4. Payment Security
- PCI DSS compliance via Stripe
- Webhook signature verification
- Secure environment variable management

## Scalability Considerations

### 1. Database Optimization
- Proper indexing strategy
- Connection pooling
- Read replicas for read-heavy operations

### 2. Caching Strategy
- Redis for session data
- CDN for static assets
- API response caching

### 3. Horizontal Scaling
- Stateless API design
- Load balancer ready
- Microservice architecture potential

### 4. Performance Monitoring
- Error tracking with Sentry
- Performance monitoring
- Database query optimization

## Development Workflow

### 1. Local Development
```
git clone → npm install → env setup → database setup → npm run dev
```

### 2. Testing Strategy
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows

### 3. Deployment Pipeline
```
Git Push → GitHub Actions → Build → Test → Deploy to Vercel → Health Check
```

## Technology Decisions

### Why Next.js?
- Full-stack framework with API routes
- Excellent TypeScript support
- Built-in optimization features
- Vercel deployment integration

### Why Prisma?
- Type-safe database operations
- Automatic migrations
- Excellent developer experience
- Strong TypeScript integration

### Why Supabase?
- Managed PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- File storage capabilities

### Why Solana?
- Fast transaction processing
- Low transaction fees
- Growing ecosystem
- Excellent developer tools
