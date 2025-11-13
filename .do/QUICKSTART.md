# Digital Ocean Quick Start Guide

Get your Sagestone SaaS Platform running on Digital Ocean in under 15 minutes!

## 🚀 5-Step Deployment

### Step 1: Prerequisites (2 minutes)

- [ ] GitHub account with access to this repository
- [ ] Digital Ocean account ([Sign up here](https://cloud.digitalocean.com/registrations/new))
- [ ] Your code pushed to GitHub

### Step 2: Create App (3 minutes)

1. Go to https://cloud.digitalocean.com/apps
2. Click **"Create App"**
3. Choose **GitHub** as source
4. Select this repository: `sagestoneinc/saastool`
5. Choose branch: `main`
6. Click **"Next"**

### Step 3: Review Configuration (2 minutes)

Digital Ocean will automatically detect the `.do/app.yaml` configuration:

✅ Web Service (Next.js)
- Build: `npm install --include=dev && npx prisma generate && npm run build && npx prisma migrate deploy`
- Run: `npm start`
- Port: 3000

✅ Database (PostgreSQL 16)
- Production-ready managed database
- Automatic backups

Click **"Next"** to continue.

### Step 4: Set Environment Variables (5 minutes)

In the environment variables section, update:

1. **Generate JWT Secret**
   ```bash
   # Run this locally to generate a secure secret
   openssl rand -base64 32
   ```

2. **Set the JWT_SECRET**
   - Find the `JWT_SECRET` variable
   - Replace the placeholder with your generated secret
   - Mark it as "Secret" (hidden in logs)

3. **Update URLs** (do this after first deployment)
   - `NEXT_PUBLIC_MARKETING_URL`: Will be your app URL
   - `NEXT_PUBLIC_APP_URL`: Will be your app URL

Note: `DATABASE_URL` is auto-populated from the database component.

Click **"Next"**.

### Step 5: Deploy! (5-10 minutes)

1. Choose your region (e.g., New York, San Francisco)
2. Review the pricing:
   - Web Service: $5/month
   - Database: $15/month
   - **Total: $20/month**
3. Click **"Create Resources"**
4. Wait for deployment (5-10 minutes)

## 🎉 You're Live!

Your app will be available at: `https://your-app-name.ondigitalocean.app`

## 🔧 Post-Deployment

### Database Migrations (Automatic)

Good news! Database migrations run automatically during the build process. The build command includes `npx prisma migrate deploy`, so your database schema is always up to date with each deployment.

If you need to run migrations manually (e.g., for a hotfix):

**Option A: Via Console**
1. Go to your app in Digital Ocean
2. Click **"Console"** tab
3. Run:
   ```bash
   npx prisma migrate deploy
   ```

**Option B: Via Local Machine**
1. Get database connection string from DO console
2. Run locally:
   ```bash
   DATABASE_URL="your-production-url" npx prisma migrate deploy
   ```

### Optional: Seed Demo Data

To add sample data for testing:
```bash
npm run db:seed
```

## ✅ Verification Checklist

Test your deployment:

- [ ] Marketing site loads: `https://your-app.ondigitalocean.app`
- [ ] Product page works: `/product`
- [ ] Pricing page works: `/pricing`
- [ ] Contact form loads: `/contact`
- [ ] Login page works: `/auth/login`
- [ ] Dashboard redirects properly: `/dashboard`

## 🌐 Add Custom Domain (Optional)

1. **In Digital Ocean:**
   - Go to app Settings → Domains
   - Click "Add Domain"
   - Enter: `tool.sagestone.dev`

2. **In Your DNS Provider:**
   - Add CNAME record:
     ```
     Type: CNAME
     Name: tool
     Value: your-app.ondigitalocean.app
     TTL: 3600
     ```

3. **Update Environment Variables:**
   - Go to Settings → Environment Variables
   - Update `NEXT_PUBLIC_MARKETING_URL` to your custom domain
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain
   - Save and redeploy

SSL certificate will be automatically provisioned (takes 5-15 minutes).

## 📊 Monitor Your App

**View Logs:**
- Go to your app → Runtime Logs
- Filter by timeframe or component

**Check Metrics:**
- Go to your app → Insights
- View CPU, memory, bandwidth usage

**Set Up Alerts:**
- Go to Settings → Alerts
- Add alerts for:
  - Deployment failures
  - High CPU usage
  - High memory usage

## 🔄 Auto-Deploy on Push

Your app is now set up to auto-deploy when you push to the `main` branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Digital Ocean will automatically:
1. Pull latest code
2. Run build
3. Deploy to production
4. Zero-downtime rollout

## 🆘 Troubleshooting

### Build Fails

**Symptom:** "Build failed" error - Missing @types/node

**Solution:**
The build command already includes `--include=dev` flag with proper command chaining. If you modified it, ensure it's:
```yaml
build_command: |
  npm install --include=dev &&
  npx prisma generate &&
  npm run build &&
  npx prisma migrate deploy
```
Note: The `&&` operators ensure commands run sequentially and stop on first failure.

**Symptom:** Prisma DATABASE_URL error during build

**Solution:**
Ensure `DATABASE_URL` has scope `RUN_AND_BUILD_TIME` in `.do/app.yaml`:
```yaml
- key: DATABASE_URL
  scope: RUN_AND_BUILD_TIME  # Not just RUN_TIME
  type: SECRET
```

### Database Connection Error

**Symptom:** Can't connect to database

**Solution:**
1. Verify `DATABASE_URL` is set (should be automatic)
2. Check database is running in DO console
3. Ensure SSL mode is included: `?sslmode=require`

### App Won't Start

**Symptom:** "Health check failed" or "Application crashed"

**Solution:**
1. Check runtime logs for errors
2. Verify all environment variables are set
3. Ensure port 3000 is correct in `app.yaml`
4. Try restarting the app

### Migrations Not Applied

**Symptom:** Database errors about missing tables

**Solution:**
Migrations run automatically during build. If you're seeing this error:
1. Check build logs to see if migrations ran successfully
2. Verify `DATABASE_URL` is available at build time (scope: `RUN_AND_BUILD_TIME`)
3. If needed, run migrations manually via Console (see Post-Deployment section)

## 📚 Next Steps

Now that your app is running:

1. **Security:**
   - [ ] Rotate JWT_SECRET regularly
   - [ ] Enable rate limiting
   - [ ] Review database permissions

2. **Performance:**
   - [ ] Monitor response times
   - [ ] Optimize slow queries
   - [ ] Consider scaling if needed

3. **Features:**
   - [ ] Configure email service (SendGrid, etc.)
   - [ ] Set up payment processing (Stripe)
   - [ ] Add analytics (Google Analytics)

4. **Backup:**
   - [ ] Verify automatic backups are running
   - [ ] Test restore procedure
   - [ ] Document recovery process

## 📖 Full Documentation

For detailed information, see:
- [Complete Deployment Guide](../DEPLOYMENT_DIGITALOCEAN.md)
- [Configuration Reference](.do/README.md)
- [General Deployment Info](../DEPLOYMENT.md)

## 💬 Get Help

- Digital Ocean Docs: https://docs.digitalocean.com/products/app-platform/
- Community Forums: https://www.digitalocean.com/community
- Support: Open ticket in DO console
- App Issues: Open issue on GitHub

---

**Congratulations! 🎉** Your Sagestone SaaS Platform is now running on Digital Ocean!
