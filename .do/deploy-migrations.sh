#!/bin/bash

# Digital Ocean Database Migration Script
# This script helps run Prisma migrations on Digital Ocean App Platform

set -e  # Exit on error

echo "🚀 Digital Ocean Database Migration Script"
echo "=========================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set"
  echo ""
  echo "To run migrations, you need to set the DATABASE_URL:"
  echo "  1. Get the connection string from Digital Ocean console"
  echo "  2. Run: export DATABASE_URL='your-connection-string'"
  echo "  3. Run this script again"
  echo ""
  exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Check if npx is available
if ! command -v npx &> /dev/null; then
  echo "❌ ERROR: npx is not installed"
  echo "Please install Node.js and npm first"
  exit 1
fi

echo "📦 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo ""
echo "✅ Migrations completed successfully!"
echo ""

# Ask if user wants to seed data
read -p "Do you want to seed demo data? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🌱 Seeding database..."
  npm run db:seed
  echo ""
  echo "✅ Database seeded successfully!"
fi

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "Next steps:"
echo "  1. Verify your app is running: https://your-app.ondigitalocean.app"
echo "  2. Test the login: /auth/login"
echo "  3. Check the dashboard: /dashboard"
echo ""
