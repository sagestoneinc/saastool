# Digital Ocean App Platform Configuration

This directory contains the configuration file for deploying to Digital Ocean's App Platform.

## Files

- **app.yaml**: The main configuration file that defines:
  - Web service (Next.js application)
  - Database (PostgreSQL)
  - Environment variables
  - Build and run commands
  - Health checks
  - Scaling settings

## Usage

### Automatic Detection

When you create a new app in Digital Ocean App Platform and connect your GitHub repository, it will automatically detect and use this configuration file.

### Manual Deployment

Using the Digital Ocean CLI (`doctl`):

```bash
# Create new app
doctl apps create --spec .do/app.yaml

# Update existing app
doctl apps update YOUR_APP_ID --spec .do/app.yaml
```

## Configuration Overview

### Web Service

The `web` service runs your Next.js application:
- **Build**: Installs dependencies, generates Prisma client, and builds the Next.js app
- **Run**: Starts the production server
- **Port**: 3000 (default Next.js port)
- **Health Check**: Monitors the root path (`/`)

### Database

A managed PostgreSQL 16 database with:
- Automatic daily backups
- SSL/TLS encryption
- Connection pooling
- High availability (in Professional plan)

### Environment Variables

Required variables that need to be set:
- `DATABASE_URL`: Auto-populated from the database component
- `JWT_SECRET`: Must be set manually (see deployment guide)
- `NEXT_PUBLIC_MARKETING_URL`: Set to your app URL
- `NEXT_PUBLIC_APP_URL`: Set to your app URL

## Customization

### Scaling

To change instance size or count:

```yaml
services:
  - name: web
    instance_count: 2  # Number of instances
    instance_size_slug: basic-s  # Instance size
```

Available instance sizes:
- `basic-xxs`: 512 MB RAM, 0.5 vCPU - $5/month
- `basic-xs`: 512 MB RAM, 1 vCPU - $5/month
- `basic-s`: 1 GB RAM, 1 vCPU - $12/month
- `basic-m`: 2 GB RAM, 2 vCPU - $24/month
- `professional-xs`: 1 GB RAM, 1 vCPU - $20/month (dedicated)

### Database Version

To change PostgreSQL version:

```yaml
databases:
  - name: db
    engine: PG
    version: "16"  # PostgreSQL version
```

### Adding Workers

Uncomment the workers section in `app.yaml` to add background job workers:

```yaml
workers:
  - name: background-worker
    build_command: npm install && npx prisma generate
    run_command: node workers/background-worker.js
```

### Adding Scheduled Jobs

Uncomment the jobs section to add cron jobs:

```yaml
jobs:
  - name: daily-cleanup
    kind: CRON
    schedule: "0 2 * * *"  # Daily at 2 AM
    run_command: node jobs/cleanup.js
```

## Important Notes

### Security

1. **Never commit secrets**: The `JWT_SECRET` placeholder in the config must be replaced via environment variables
2. **Database SSL**: Always use SSL for database connections (enabled by default)
3. **Environment variables**: Sensitive values should be set via Digital Ocean console, not in this file

### Build Process

The build command includes:
1. `npm install` - Installs dependencies
2. `npx prisma generate` - Generates Prisma Client
3. `npm run build` - Builds Next.js application

Note: Database migrations are NOT included in the build by default. Run them separately after deployment:

```bash
npx prisma migrate deploy
```

### Deployment Triggers

By default, the app redeploys automatically when:
- Code is pushed to the `main` branch
- The configuration in `app.yaml` is updated
- Manual deployment is triggered

## Resources

- [Digital Ocean App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [App Spec Reference](https://docs.digitalocean.com/products/app-platform/reference/app-spec/)
- [Complete Deployment Guide](../DEPLOYMENT_DIGITALOCEAN.md)

## Support

For issues with Digital Ocean deployment:
1. Check the [Troubleshooting Guide](../DEPLOYMENT_DIGITALOCEAN.md#troubleshooting)
2. View application logs in the Digital Ocean console
3. Contact Digital Ocean support
4. Open an issue in this repository

## Next Steps

After setting up your app:
1. Configure environment variables in Digital Ocean console
2. Run database migrations
3. Set up custom domain (optional)
4. Configure monitoring and alerts
5. Test the deployment thoroughly

See the [complete deployment guide](../DEPLOYMENT_DIGITALOCEAN.md) for detailed instructions.
