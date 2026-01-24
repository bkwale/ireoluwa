#!/bin/bash

echo "🗄️ EngineerIQ Database Setup"
echo "=============================="
echo ""

# Check if environment variables are set
if [ -z "$DATABASE_URL" ] || [ -z "$DATABASE_AUTH_TOKEN" ]; then
    echo "❌ Error: Environment variables not set"
    echo ""
    echo "Please set these variables first:"
    echo ""
    echo "export DATABASE_URL='libsql://your-database-url.turso.io'"
    echo "export DATABASE_AUTH_TOKEN='your-token-here'"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Environment variables detected"
echo "📍 Database URL: $DATABASE_URL"
echo ""

# Navigate to project directory
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/engineeriq"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"
echo ""

# Seed the database
echo "🌱 Seeding database with initial data..."
npx tsx prisma/seed.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "=============================="
    echo "🎉 Setup Complete!"
    echo "=============================="
    echo ""
    echo "Your Turso database is now ready with:"
    echo "  ✅ 2 users (student + guardian)"
    echo "  ✅ 3 units (Maths, Science, Materials)"
    echo "  ✅ 22 topics"
    echo "  ✅ 5 sample problems"
    echo ""
    echo "Next steps:"
    echo "1. Add these environment variables to Vercel:"
    echo "   - DATABASE_URL=$DATABASE_URL"
    echo "   - DATABASE_AUTH_TOKEN=$DATABASE_AUTH_TOKEN"
    echo "   - SESSION_SECRET=$(openssl rand -base64 32)"
    echo ""
    echo "2. Redeploy your app on Vercel"
    echo "3. Access at: https://ireoluwa.vercel.app"
    echo ""
else
    echo ""
    echo "❌ Setup failed. Please check the error messages above."
fi
