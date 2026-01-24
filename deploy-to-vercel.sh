#!/bin/bash

echo "🚀 EngineerIQ - Vercel Deployment Setup"
echo "========================================"
echo ""

# Add turso to PATH
export PATH="/Users/BK_1/.turso:$PATH"

# Check if logged in to Turso
echo "📝 Step 1: Checking Turso authentication..."
if ! turso auth whoami &>/dev/null; then
    echo "❌ Not logged in to Turso. Please run: turso auth login"
    exit 1
fi
echo "✅ Turso authentication verified"
echo ""

# Create database
echo "📝 Step 2: Creating Turso database..."
if turso db show engineeriq &>/dev/null; then
    echo "✅ Database 'engineeriq' already exists"
else
    turso db create engineeriq
    echo "✅ Database 'engineeriq' created"
fi
echo ""

# Get database URL
echo "📝 Step 3: Getting database URL..."
DB_URL=$(turso db show engineeriq --url)
echo "✅ Database URL: $DB_URL"
echo ""

# Create auth token
echo "📝 Step 4: Creating authentication token..."
AUTH_TOKEN=$(turso db tokens create engineeriq)
echo "✅ Auth token created"
echo ""

# Apply migrations
echo "📝 Step 5: Applying database migrations..."
turso db shell engineeriq < prisma/migrations/20260124162350_init/migration.sql
echo "✅ Migrations applied"
echo ""

# Run seed
echo "📝 Step 6: Seeding database..."
export DATABASE_URL="$DB_URL"
export DATABASE_AUTH_TOKEN="$AUTH_TOKEN"
npx tsx prisma/seed.ts
echo "✅ Database seeded"
echo ""

# Generate random session secret
SESSION_SECRET=$(openssl rand -base64 32)

echo "======================================"
echo "🎉 Setup Complete!"
echo "======================================"
echo ""
echo "Now add these environment variables to Vercel:"
echo ""
echo "1. Go to: https://vercel.com/[your-username]/ireoluwa/settings/environment-variables"
echo ""
echo "2. Add these three variables:"
echo ""
echo "   DATABASE_URL=$DB_URL"
echo ""
echo "   DATABASE_AUTH_TOKEN=$AUTH_TOKEN"
echo ""
echo "   SESSION_SECRET=$SESSION_SECRET"
echo ""
echo "3. Redeploy your project on Vercel"
echo ""
echo "======================================"
