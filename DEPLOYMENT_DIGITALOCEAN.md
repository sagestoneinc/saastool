# Digital Ocean Deployment Guide

Complete guide for deploying the Sagestone SaaS Platform to Digital Ocean's App Platform.

## Table of Contents
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Deployment Methods](#deployment-methods)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)
- [Custom Domain](#custom-domain)
- [Scaling & Performance](#scaling--performance)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Cost Estimation](#cost-estimation)

## Quick Start

The fastest way to deploy to Digital Ocean:

1. **Fork/Clone this repository to your GitHub account**

2. **Create a Digital Ocean account** (if you don't have one)
   - Visit: https://cloud.digitalocean.com/registrations/new
   - Get $200 credit for 60 days with this link: https://m.do.co/c/your-referral-code

3. **Deploy using App Platform**
   ```bash
   # Option A: Use the web UI (recommended for first deployment)
   # Go to: https://cloud.digitalocean.com/apps/new
   # Select "GitHub" as source
   # Choose your repository
   # Digital Ocean will auto-detect the configuration from .do/app.yaml
   
   # Option B: Use doctl CLI
   doctl apps create --spec .do/app.yaml
   ```

4. **Configure environment variables** (see below)

5. **Run database migrations**
   ```bash
   # After first deployment, run migrations via console or SSH
   npx prisma migrate deploy
   ```

6. **Access your application**
   - Your app will be available at: `https://your-app-name.ondigitalocean.app`

## Prerequisites

### Required
- Digital Ocean account
- GitHub repository with your code
- Basic understanding of environment variables

### Recommended Tools
- **doctl** - Digital Ocean CLI tool
  ```bash
  # Install on macOS
  brew install doctl
  
  # Install on Linux
  cd ~
  wget https://github.com/digitalocean/doctl/releases/download/v1.104.0/doctl-1.104.0-linux-amd64.tar.gz
  tar xf ~/doctl-1.104.0-linux-amd64.tar.gz
  sudo mv ~/doctl /usr/local/bin
  
  # Authenticate
  doctl auth init
  ```

## Deployment Methods

### Method 1: Web UI (Recommended for Beginners)

1. **Go to App Platform**
   - Visit: https://cloud.digitalocean.com/apps
   - Click "Create App"

2. **Connect GitHub**
   - Select "GitHub" as your source
   - Authorize Digital Ocean to access your repository
   - Choose the `sagestoneinc/saastool` repository
   - Select branch: `main`

3. **Configure App**
   - Digital Ocean will automatically detect the `.do/app.yaml` configuration
   - Review the detected configuration:
     - Web service (Next.js app)
     - PostgreSQL database
   - Click "Next"

4. **Set Environment Variables**
   - Edit the `web` service
   - Add/Update environment variables:
     ```
     JWT_SECRET=<generate-secure-random-string-32-chars>
     DATABASE_URL=<auto-populated-from-database>
     NEXT_PUBLIC_MARKETING_URL=<will-be-your-app-url>
     NEXT_PUBLIC_APP_URL=<will-be-your-app-url>
     ```

5. **Review & Deploy**
   - Review all settings
   - Choose your region (New York, San Francisco, etc.)
   - Click "Create Resources"
   - Wait 5-10 minutes for initial deployment

### Method 2: CLI Deployment

1. **Install and authenticate doctl**
   ```bash
   doctl auth init
   ```

2. **Create app from spec**
   ```bash
   # Create new app
   doctl apps create --spec .do/app.yaml
   
   # Update existing app
   doctl apps update YOUR_APP_ID --spec .do/app.yaml
   ```

3. **Set environment variables**
   ```bash
   # List apps to get APP_ID
   doctl apps list
   
   # Update environment variable
   doctl apps update YOUR_APP_ID \
     --env JWT_SECRET=your-secure-secret-here
   ```

4. **Monitor deployment**
   ```bash
   # Get deployment status
   doctl apps list-deployments YOUR_APP_ID
   
   # View logs
   doctl apps logs YOUR_APP_ID --type BUILD
   doctl apps logs YOUR_APP_ID --type RUN
   ```

### Method 3: GitHub Actions (CI/CD)

Create `.github/workflows/deploy-digitalocean.yml`:

```yaml
name: Deploy to Digital Ocean

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install doctl
        uses: digitalocean/action-doctl@v2
        with:
          token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
      
      - name: Deploy to Digital Ocean
        run: |
          doctl apps update ${{ secrets.DIGITALOCEAN_APP_ID }} --spec .do/app.yaml
```

Add secrets to GitHub:
- `DIGITALOCEAN_ACCESS_TOKEN`: Your DO API token
- `DIGITALOCEAN_APP_ID`: Your app ID from Digital Ocean

## Environment Variables

### Required Environment Variables

| Variable | Description | Example | Where to Set |
|----------|-------------|---------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:25060/db?sslmode=require` | Auto-populated by DO |
| `JWT_SECRET` | Secret for JWT tokens | 32+ random characters | Manual in DO console |
| `NEXT_PUBLIC_MARKETING_URL` | Marketing site URL | `https://your-app.ondigitalocean.app` | Manual in DO console |
| `NEXT_PUBLIC_APP_URL` | SaaS app URL | `https://your-app.ondigitalocean.app` | Manual in DO console |

### How to Set Environment Variables

**Via Web UI:**
1. Go to your app in Digital Ocean console
2. Click on "Settings" tab
3. Scroll to "App-Level Environment Variables"
4. Click "Edit" and add variables
5. Click "Save"
6. Redeploy if needed

**Via CLI:**
```bash
# Set a single variable
doctl apps update YOUR_APP_ID \
  --env JWT_SECRET=your-secret-here

# Set multiple variables
doctl apps update YOUR_APP_ID \
  --env JWT_SECRET=secret1 \
  --env NODE_ENV=production
```

### Generating Secure JWT Secret

```bash
# Using OpenSSL (recommended)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Using Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## Database Setup

Digital Ocean will automatically create and configure a managed PostgreSQL database when you deploy using the `.do/app.yaml` configuration.

### Database Configuration

The managed PostgreSQL database includes:
- **Version**: PostgreSQL 16
- **Automatic backups**: Daily
- **High availability**: Optional (in Professional plan)
- **SSL/TLS encryption**: Enabled by default
- **Connection pooling**: Included

### Running Migrations

After initial deployment, you need to run database migrations:

**Method 1: Via Console (Recommended)**
```bash
# Get console access to your app
doctl apps list  # Get your APP_ID
doctl apps create-deployment YOUR_APP_ID

# Or use the web console
# Go to Console tab in DO dashboard
# Run: npx prisma migrate deploy
```

**Method 2: Via Local Machine**
```bash
# Get database connection string from DO console
# Then run migrations locally
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

**Method 3: Add to Build Command**

Edit `.do/app.yaml` to include migrations in build:
```yaml
build_command: |
  npm install
  npx prisma generate
  npm run build
  npx prisma migrate deploy
```

Note: This runs migrations on every build. Use with caution in production.

### Database Management

**Access Prisma Studio:**
```bash
# Via local machine (requires database access)
DATABASE_URL="your-production-url" npx prisma studio
```

**Backup Database:**
```bash
# Manual backup via doctl
doctl databases backup create YOUR_DATABASE_ID

# List backups
doctl databases backup list YOUR_DATABASE_ID
```

**Connection Details:**
- Host, port, user, password, and database name are available in DO console
- Under "Connection Details" in database section
- SSL mode is required for connections

## Post-Deployment

### Initial Setup Checklist

- [ ] Verify app is accessible at provided URL
- [ ] Test database connection
- [ ] Run database migrations
- [ ] Verify all environment variables are set correctly
- [ ] Test signup/login flow
- [ ] Check application logs for errors
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate (automatic with custom domain)
- [ ] Set up monitoring and alerts
- [ ] Configure backups (automatic, but verify)
- [ ] Test email functionality (when configured)
- [ ] Review security settings

### Verify Deployment

```bash
# Check app status
doctl apps list

# View recent deployments
doctl apps list-deployments YOUR_APP_ID

# Check logs
doctl apps logs YOUR_APP_ID --type RUN --follow

# Test health endpoint
curl https://your-app.ondigitalocean.app/
```

### Seed Demo Data (Optional)

```bash
# Access console
doctl apps create-deployment YOUR_APP_ID

# Run seed command
npm run db:seed
```

## Custom Domain

### Setting Up Custom Domain

1. **Add domain in Digital Ocean**
   - Go to your app settings
   - Click "Domains" tab
   - Click "Add Domain"
   - Enter your domain: `tool.sagestone.dev`

2. **Configure DNS**
   
   Add these records to your DNS provider:
   ```
   Type: CNAME
   Name: tool (or @)
   Value: your-app.ondigitalocean.app
   TTL: 3600
   ```

3. **SSL Certificate**
   - Digital Ocean automatically provisions Let's Encrypt SSL
   - Takes 5-15 minutes to activate
   - Auto-renews before expiration

### Multiple Domains

To host marketing and app on separate domains:

```yaml
# In .do/app.yaml, add domains section
domains:
  - domain: tool.sagestone.dev
    type: PRIMARY
  - domain: app.sagestone.dev
    type: ALIAS
```

Then update environment variables:
```
NEXT_PUBLIC_MARKETING_URL=https://tool.sagestone.dev
NEXT_PUBLIC_APP_URL=https://app.sagestone.dev
```

## Scaling & Performance

### Horizontal Scaling

Increase number of instances:

**Via UI:**
- Go to app settings
- Edit web service
- Increase "Instance Count"
- Save and redeploy

**Via CLI:**
```bash
# Update app.yaml with new instance_count
instance_count: 3

# Apply changes
doctl apps update YOUR_APP_ID --spec .do/app.yaml
```

### Vertical Scaling

Upgrade instance size:

**Available sizes:**
- `basic-xxs`: 512 MB RAM, 0.5 vCPU - $5/month
- `basic-xs`: 512 MB RAM, 1 vCPU - $5/month
- `basic-s`: 1 GB RAM, 1 vCPU - $12/month
- `basic-m`: 2 GB RAM, 2 vCPU - $24/month
- `professional-xs`: 1 GB RAM, 1 vCPU - $20/month (dedicated)
- `professional-s`: 2 GB RAM, 2 vCPU - $40/month (dedicated)

**Update instance size:**
```yaml
# In .do/app.yaml
instance_size_slug: basic-s  # or professional-xs
```

### Database Scaling

Upgrade database plan in Digital Ocean console:
- Basic: $15/month (1 GB RAM, 1 vCPU, 10 GB storage)
- Professional: $60/month (4 GB RAM, 2 vCPU, 115 GB storage)
- Professional Plus: Higher tiers available

### Caching & CDN

Digital Ocean automatically provides:
- Edge caching for static assets
- CDN for global distribution
- Brotli/Gzip compression

For additional caching:
```javascript
// In next.config.ts
const nextConfig = {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

## Monitoring

### Built-in Monitoring

Digital Ocean provides:
- CPU usage metrics
- Memory usage metrics
- Bandwidth metrics
- Request count and response times
- Error rates

Access via: App Dashboard → Insights tab

### Application Logs

**Via Web UI:**
- Go to app dashboard
- Click "Runtime Logs" tab
- Filter by component, time range

**Via CLI:**
```bash
# Runtime logs
doctl apps logs YOUR_APP_ID --type RUN --follow

# Build logs
doctl apps logs YOUR_APP_ID --type BUILD

# Database logs (if enabled)
doctl databases logs YOUR_DB_ID
```

### Set Up Alerts

Configure alerts in Digital Ocean:

1. Go to app settings
2. Click "Alerts" tab
3. Add alert rules:
   - Deployment failed
   - High CPU usage (>80%)
   - High memory usage (>80%)
   - Error rate threshold
   - Response time threshold

### External Monitoring (Optional)

Integrate with external services:

**Sentry for Error Tracking:**
```bash
npm install @sentry/nextjs

# Configure in sentry.config.ts
```

**LogRocket for Session Replay:**
```bash
npm install logrocket
```

**Uptime Robot for Monitoring:**
- Free tier: 50 monitors
- Set up HTTP(s) monitoring
- Check every 5 minutes

## Troubleshooting

### Common Issues

#### 1. Build Fails

**Error: Prisma Client not generated**
```bash
# Solution: Ensure build command includes prisma generate
build_command: |
  npm install
  npx prisma generate
  npm run build
```

**Error: Out of memory during build**
```bash
# Solution: Increase build resources or optimize build
# Add to package.json
"build": "NODE_OPTIONS='--max-old-space-size=2048' next build"
```

#### 2. Database Connection Issues

**Error: Can't reach database**
```bash
# Check DATABASE_URL is set correctly
doctl apps list-components YOUR_APP_ID

# Verify database is running
doctl databases list

# Test connection
DATABASE_URL="your-url" npx prisma db pull
```

**Error: SSL required**
```bash
# Add to DATABASE_URL
?sslmode=require
```

#### 3. Runtime Errors

**Check logs:**
```bash
# View recent errors
doctl apps logs YOUR_APP_ID --type RUN --tail 100

# Follow logs in real-time
doctl apps logs YOUR_APP_ID --type RUN --follow
```

**Restart app:**
```bash
# Via UI: Click "Restart" button
# Via CLI: Create new deployment
doctl apps create-deployment YOUR_APP_ID
```

#### 4. Performance Issues

**High response times:**
- Check database connection pooling
- Review database queries (use Prisma query logging)
- Consider upgrading instance size
- Enable caching for static assets
- Optimize database indexes

**High memory usage:**
- Check for memory leaks in application code
- Upgrade instance size
- Optimize Next.js build output

### Debug Mode

Enable verbose logging:

```yaml
# In .do/app.yaml
envs:
  - key: DEBUG
    value: "*"
  - key: LOG_LEVEL
    value: "debug"
```

### Getting Help

- **Digital Ocean Community**: https://www.digitalocean.com/community
- **App Platform Docs**: https://docs.digitalocean.com/products/app-platform/
- **Support Tickets**: Available in DO console (for paid accounts)
- **GitHub Issues**: For application-specific issues

## Cost Estimation

### Basic Deployment (Development/Testing)

| Component | Tier | Cost |
|-----------|------|------|
| Web Service | basic-xs (512 MB, 1 vCPU) | $5/month |
| PostgreSQL | Basic (1 GB RAM, 10 GB storage) | $15/month |
| **Total** | | **$20/month** |

### Production Deployment (Small Business)

| Component | Tier | Cost |
|-----------|------|------|
| Web Service | basic-s (1 GB, 1 vCPU) × 2 instances | $24/month |
| PostgreSQL | Professional (4 GB RAM, 115 GB storage) | $60/month |
| Bandwidth | Included (1 TB) | $0 |
| Backups | Daily automatic | Included |
| **Total** | | **$84/month** |

### Production Deployment (Growing Company)

| Component | Tier | Cost |
|-----------|------|------|
| Web Service | professional-xs (1 GB, 1 vCPU) × 3 instances | $60/month |
| PostgreSQL | Professional Plus (8 GB RAM, 256 GB) | $120/month |
| CDN/Bandwidth | Included (1 TB) | $0 |
| Backups | Daily automatic | Included |
| **Total** | | **$180/month** |

### Additional Costs

- **Custom Domain**: $0 (SSL included)
- **Extra Bandwidth**: $0.01/GB over 1 TB
- **Additional Storage**: $0.10/GB/month
- **Additional Backups**: Included in database plan
- **Support**: Free community, paid plans available

### Cost Optimization Tips

1. Start with basic tier, scale as needed
2. Use single instance for development
3. Monitor usage via dashboard
4. Enable automatic database backups (included)
5. Utilize included CDN and bandwidth
6. Consider reserved instances for predictable workloads (contact DO sales)

## Next Steps

After successful deployment:

1. **Configure Email Service**
   - Set up SendGrid, AWS SES, or Mailgun
   - Add email credentials to environment variables

2. **Set Up Payment Processing**
   - Integrate Stripe or other payment gateway
   - Configure webhook endpoints

3. **Add Analytics**
   - Google Analytics
   - Mixpanel
   - Custom analytics dashboard

4. **Security Hardening**
   - Enable rate limiting
   - Set up WAF (Web Application Firewall)
   - Configure CORS policies
   - Regular security audits

5. **Monitoring & Observability**
   - Set up Sentry for error tracking
   - Configure performance monitoring
   - Set up uptime monitoring

6. **Backup Strategy**
   - Verify automatic backups are running
   - Test restore procedures
   - Document disaster recovery plan

7. **CI/CD Pipeline**
   - Set up GitHub Actions
   - Automated testing
   - Preview deployments for PRs

## Support & Resources

- **Digital Ocean Documentation**: https://docs.digitalocean.com/products/app-platform/
- **Community Tutorials**: https://www.digitalocean.com/community/tags/app-platform
- **Status Page**: https://status.digitalocean.com/
- **API Documentation**: https://docs.digitalocean.com/reference/api/
- **Sagestone Support**: support@sagestone.dev

## Conclusion

You now have a production-ready deployment of the Sagestone SaaS Platform on Digital Ocean! The platform provides:

✅ Automatic deployments from GitHub  
✅ Managed PostgreSQL database with backups  
✅ SSL certificates (automatic)  
✅ CDN and edge caching  
✅ Monitoring and logging  
✅ Easy scaling options  
✅ 99.99% uptime SLA  

For questions or issues, refer to the troubleshooting section or reach out to support.
