#!/bin/bash

echo "🗄️ Setting up Neon Database"
echo "=============================="
echo ""

# Run Prisma migrations
echo "📋 Running migrations..."
npx prisma migrate deploy

# Seed the database
echo "🌱 Seeding database..."
npx tsx prisma/seed.ts

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Login credentials:"
echo "  Student: username=ireoluwa, password=student123"
echo "  Guardian: username=admin, password=guardian123"
