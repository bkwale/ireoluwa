# 🚀 EngineerIQ Deployment Guide

## ⚠️ Important: SQLite Limitations

SQLite (file-based database) **does not work** on Vercel's serverless platform because:
- File system is read-only
- No persistent storage between deployments
- Each serverless function has its own isolated filesystem

## 🎯 Recommended Deployment Options

### Option 1: Vercel + Turso (Easiest) ✅

Turso is a SQLite-compatible serverless database that works perfectly with Vercel.

**Steps:**

1. **Create Turso Database**
   ```bash
   # Install Turso CLI
   brew install tursodatabase/tap/turso

   # Login
   turso auth login

   # Create database
   turso db create engineeriq

   # Get connection URL
   turso db show engineeriq --url

   # Get auth token
   turso db tokens create engineeriq
   ```

2. **Update Prisma Configuration**

   In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

3. **Update Environment Variables in Vercel**
   - Go to Vercel project settings → Environment Variables
   - Add `DATABASE_URL` = `libsql://[your-db-url]`
   - Add `DATABASE_AUTH_TOKEN` = `[your-token]`
   - Add `SESSION_SECRET` = `[random-32+-char-string]`

4. **Update lib/db.ts**
   ```typescript
   import { PrismaLibSql } from '@prisma/adapter-libsql';

   const adapter = new PrismaLibSql({
     url: process.env.DATABASE_URL || 'file:./dev.db',
     authToken: process.env.DATABASE_AUTH_TOKEN,
   });
   ```

5. **Run migrations on Turso**
   ```bash
   turso db shell engineeriq < prisma/migrations/[migration-folder]/migration.sql
   ```

6. **Seed the database**
   ```bash
   # Set environment variable temporarily
   export DATABASE_URL="libsql://[your-url]"
   export DATABASE_AUTH_TOKEN="[your-token]"

   # Run seed
   npx tsx prisma/seed.ts
   ```

7. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

---

### Option 2: Vercel + Vercel Postgres

Use Vercel's native PostgreSQL offering.

**Steps:**

1. **Add Vercel Postgres to your project**
   - Go to Vercel Dashboard → Storage → Create Database → Postgres

2. **Update Prisma Schema**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Update data types** (some changes needed):
   - Change `String` fields to appropriate types
   - Adjust `@default(cuid())` if needed

4. **Run migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed database**
   ```bash
   npx tsx prisma/seed.ts
   ```

---

### Option 3: Deploy on Railway/Render (Keeps SQLite)

These platforms support persistent storage, so SQLite works fine.

**Railway:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

**Render:**
- Create a new Web Service
- Connect your GitHub repo
- Set build command: `npm install && npx prisma generate && npm run build`
- Set start command: `npm start`
- Add environment variables

---

### Option 4: Local Development Only

Keep using the app locally:

```bash
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/engineeriq"
npm run dev
```

Access at: http://localhost:3000

**Pros:**
- No deployment hassle
- SQLite works perfectly
- Free
- Full control

**Cons:**
- Must keep computer running
- Not accessible remotely
- Need to manage backups manually

---

## 🔧 Quick Fix for Vercel Error

The current error on Vercel is because:
1. SQLite doesn't work on serverless
2. Missing DATABASE_URL in environment variables
3. Prisma client needs regeneration

**Immediate solutions:**
1. **Remove from Vercel** and use locally (fastest)
2. **Switch to Turso** (best for production)
3. **Use Railway instead** (easiest migration)

---

## 📝 Recommended Approach

For Ireoluwa's use case (single student, monitored by guardian):

### ✅ **Best Option: Keep it Local**

**Why:**
- App works perfectly already
- No deployment complexity
- Free
- Full privacy
- Instant access on your computer

**Setup:**
1. Keep app running on your computer
2. Ireoluwa accesses via http://localhost:3000
3. You monitor via guardian dashboard
4. Backup `dev.db` file weekly

**To run permanently:**
```bash
# Install PM2
npm install -g pm2

# Start app
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/engineeriq"
pm2 start npm --name "engineeriq" -- run dev

# Make it start on boot
pm2 startup
pm2 save
```

---

## 🆘 Current Status

**Local**: ✅ Working perfectly
**Vercel**: ❌ Needs database migration to Turso/Postgres

**What to do now:**
1. For immediate use: Keep running locally (it works!)
2. For cloud deployment: Follow Turso setup above
3. For simplest cloud: Use Railway instead of Vercel

---

## 💡 My Recommendation

**Keep it local** for now because:
1. It works perfectly already
2. No monthly costs
3. Better performance
4. Full privacy for Ireoluwa
5. You control everything

You can always deploy later if needed!
