# Portbl.Life - Modern E-commerce Platform

A full-stack e-commerce platform built with Next.js, featuring traditional and cryptocurrency payment processing.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Dual Payment Systems**: Stripe for traditional payments, Solana for crypto
- **Authentication**: Secure user authentication with Supabase
- **Product Management**: Full product catalog with search and filtering
- **Order Management**: Complete order processing and tracking
- **Admin Dashboard**: Administrative interface for management
- **Mobile Responsive**: Optimized for all device sizes
- **Performance Optimized**: Fast loading and excellent SEO

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI
- **State Management**: React Context and hooks

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Payments**: Stripe, Solana Web3.js
- **Validation**: Zod schemas
- **Middleware**: Custom authentication and rate limiting

### Infrastructure
- **Deployment**: Vercel
- **Database Hosting**: Supabase
- **File Storage**: Supabase Storage
- **Monitoring**: Vercel Analytics

## 📦 Installation

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database
- Supabase account
- Stripe account
- Solana wallet (for crypto payments)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/elicharlese/Portbl.Life.git
   cd Portbl.Life
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   # Database
   DATABASE_URL="your_postgresql_url"
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # Solana
   SOLANA_RPC_URL="https://api.devnet.solana.com"
   SOLANA_DEVNET_RPC_URL="https://api.devnet.solana.com"
   ```

4. **Database setup**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   pnpm db:seed
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the application.

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Architecture](./docs/architecture.md) - System design and architecture
- [Development Guide](./docs/development-guide.md) - Setup and development workflow
- [API Reference](./docs/api-reference.md) - Complete API documentation
- [Deployment Guide](./docs/deployment-guide.md) - Production deployment
- [Troubleshooting](./docs/troubleshooting.md) - Common issues and solutions

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset

### Products
- `GET /api/products` - Get products list
- `GET /api/products/[slug]` - Get product details

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Remove cart item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/[id]` - Get order details

### Payments
- `POST /api/payments/stripe` - Create Stripe payment
- `POST /api/payments/crypto` - Create crypto payment
- `PUT /api/payments/crypto/[id]` - Verify crypto payment

## 🔧 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run tests
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run database migrations
pnpm db:seed      # Seed database with sample data
pnpm format       # Format code with Prettier
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import your repository to Vercel
   - Configure environment variables
   - Deploy automatically on push to main

2. **Database Setup**
   - Use Supabase for managed PostgreSQL
   - Configure connection strings
   - Run migrations in production

3. **Environment Variables**
   Set all required environment variables in Vercel dashboard.

### Docker (Alternative)

A Dockerfile is provided for containerized deployment:

```bash
docker build -t portbl-life .
docker run -p 3000:3000 portbl-life
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Development Guide](./docs/development-guide.md) for detailed contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` directory
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Stripe](https://stripe.com/) - Payment processing
- [Solana](https://solana.com/) - Blockchain platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Prisma](https://prisma.io/) - Next-generation ORM

## 🎯 Roadmap

- [ ] Advanced search with Elasticsearch
- [ ] Real-time inventory management
- [ ] Multi-vendor marketplace
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] AI-powered product recommendations
- [ ] International payment methods
- [ ] Multi-language support

---

Built with ❤️ by the Portbl.Life team
