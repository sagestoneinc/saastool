# Deployment Guide for Sagestone SaaS Platform

This guide will help you deploy the Sagestone application to production.

## Quick Links

- **Digital Ocean** (Recommended): See [DEPLOYMENT_DIGITALOCEAN.md](DEPLOYMENT_DIGITALOCEAN.md) for complete guide
- **Vercel**: See instructions below
- **Railway**: See Alternative Platforms section
- **Render**: See Alternative Platforms section

## Deployment Platform Comparison

| Platform | Setup Time | Starting Cost | Managed DB | Auto-SSL | CDN | Best For |
|----------|------------|---------------|------------|----------|-----|----------|
| **Digital Ocean** | 10 min | $20/mo | ✅ Yes | ✅ Yes | ✅ Yes | Production apps |
| **Vercel** | 5 min | $0-20/mo | ❌ No* | ✅ Yes | ✅ Yes | Quick deployments |
| **Railway** | 10 min | $15/mo | ✅ Yes | ✅ Yes | ❌ No | Simple apps |
| **Render** | 15 min | $15/mo | ✅ Yes | ✅ Yes | ❌ No | Cost-conscious |

*Vercel requires separate database service

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git repository access
- Account on your chosen hosting platform

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saastool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/sagestone?schema=public"
   
   # JWT Secret (generate a secure random string)
   JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
   
   # Next.js URLs
   NEXT_PUBLIC_MARKETING_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   
   Generate Prisma client:
   ```bash
   npm run db:generate
   ```
   
   Run migrations:
   ```bash
   npm run db:migrate
   ```
   
   Seed demo data (optional):
   ```bash
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit:
   - Marketing site: http://localhost:3000
   - Dashboard: http://localhost:3000/dashboard
   - Login: http://localhost:3000/auth/login (demo@sagestone.dev / password123)

## Production Deployment

### Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure environment variables in Vercel**
   
   In Vercel project settings, add:
   ```
   DATABASE_URL=<your-production-postgres-url>
   JWT_SECRET=<secure-random-string-32chars>
   NEXT_PUBLIC_MARKETING_URL=https://tool.sagestone.dev
   NEXT_PUBLIC_APP_URL=https://app.sagestone.dev
   ```

4. **Set up production database**
   
   Options:
   - Vercel Postgres (integrated)
   - Supabase (free tier available)
   - Railway (easy setup)
   - AWS RDS (enterprise)
   - Render (simple setup)

5. **Run migrations in production**
   
   After first deployment:
   ```bash
   # Connect to production database
   DATABASE_URL="<prod-url>" npx prisma migrate deploy
   
   # Optional: Seed demo data
   DATABASE_URL="<prod-url>" npm run db:seed
   ```

6. **Deploy**
   - Vercel will automatically deploy on push
   - First deployment takes 2-3 minutes

### Custom Domain Setup

1. **Add custom domains in Vercel**
   - Project Settings → Domains
   - Add `tool.sagestone.dev` for marketing site
   - Add `app.sagestone.dev` for SaaS app (requires Multi-Project setup)

2. **Configure DNS**
   - Add CNAME record for your domain pointing to Vercel
   - Wait for SSL certificate provisioning (automatic)

### Alternative Deployment Platforms

#### Digital Ocean App Platform (Recommended)

**Complete guide**: See [DEPLOYMENT_DIGITALOCEAN.md](DEPLOYMENT_DIGITALOCEAN.md)

Quick start:
1. Go to https://cloud.digitalocean.com/apps
2. Connect GitHub repository
3. Digital Ocean auto-detects configuration from `.do/app.yaml`
4. Set environment variables
5. Deploy automatically

**Pricing**: Starting at $20/month (web + database)

**Features**:
- Managed PostgreSQL database with automatic backups
- Automatic SSL certificates
- CDN and edge caching included
- Easy horizontal and vertical scaling
- Built-in monitoring and alerting
- 99.99% uptime SLA

#### Railway

1. Create new project from GitHub
2. Add PostgreSQL plugin
3. Set environment variables
4. Deploy automatically

#### Render

1. Create new Web Service
2. Connect GitHub repository
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

## Post-Deployment Checklist

- [ ] Verify marketing site is accessible
- [ ] Test signup/login flow
- [ ] Verify database connection
- [ ] Check API routes are working
- [ ] Test contact form submission
- [ ] Verify email notifications (when configured)
- [ ] Review analytics setup (when configured)
- [ ] Test responsive design on mobile
- [ ] Run security audit
- [ ] Set up monitoring (Vercel Analytics, Sentry)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | Random 32+ character string |
| `NEXT_PUBLIC_MARKETING_URL` | Marketing site URL | `https://tool.sagestone.dev` |
| `NEXT_PUBLIC_APP_URL` | SaaS app URL | `https://app.sagestone.dev` |

## Database Migrations

### Creating a new migration
```bash
npm run db:migrate -- --name your_migration_name
```

### Applying migrations to production
```bash
DATABASE_URL="<prod-url>" npx prisma migrate deploy
```

### Viewing database in Prisma Studio
```bash
npm run db:studio
```

## Monitoring & Maintenance

### Logs
- View logs in Vercel dashboard
- Set up error tracking with Sentry
- Configure uptime monitoring

### Database Backups
- Enable automatic backups in your database provider
- Test restore procedures regularly

### Performance Monitoring
- Use Vercel Analytics
- Set up custom performance metrics
- Monitor API response times

## Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database connection issues
```bash
# Test connection
DATABASE_URL="<url>" npx prisma db pull
```

### Environment variables not loading
- Ensure `.env` is in root directory
- Restart dev server after changes
- Check Vercel dashboard for production values

## Security Considerations

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use Vercel environment variables for production

2. **Rotate JWT secrets regularly**
   - Update in environment variables
   - Users will need to re-login

3. **Use strong database passwords**
   - Minimum 20 characters
   - Mix of letters, numbers, symbols

4. **Enable database SSL**
   - Add `?sslmode=require` to DATABASE_URL

5. **Set up rate limiting**
   - Use Vercel's built-in rate limiting
   - Add custom middleware for API routes

## Support

For issues or questions:
- Email: support@sagestone.dev
- Documentation: See README.md
- GitHub Issues: <repository-url>/issues

## Next Steps

After deployment:
1. Configure email service (SendGrid, AWS SES)
2. Set up payment processing (Stripe)
3. Add analytics (Google Analytics, Mixpanel)
4. Configure monitoring (Sentry, LogRocket)
5. Set up CI/CD pipelines
6. Add integration tests
7. Configure backup procedures
8. Set up staging environment
