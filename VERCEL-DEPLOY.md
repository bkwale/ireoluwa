# 🚀 Deploy EngineerIQ to Vercel - Simple Guide

## ✅ What You Need

Since Ireoluwa doesn't live with you, we need to deploy to the cloud. Here's the simplest way:

## 📋 Step-by-Step Instructions

### Step 1: Complete Turso Login

A browser window should have opened asking you to login to Turso. Complete that login.

### Step 2: Run the Deployment Script

Once you're logged in to Turso, run:

```bash
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/engineeriq"
./deploy-to-vercel.sh
```

This script will:
- ✅ Create a Turso database
- ✅ Apply database migrations
- ✅ Seed with initial data
- ✅ Generate environment variables

### Step 3: Add Environment Variables to Vercel

The script will output 3 environment variables. Copy them and:

1. Go to your Vercel project: https://vercel.com
2. Click on your "ireoluwa" project
3. Go to Settings → Environment Variables
4. Add these 3 variables:
   - `DATABASE_URL`
   - `DATABASE_AUTH_TOKEN`
   - `SESSION_SECRET`
5. Apply to "Production, Preview, and Development"

### Step 4: Redeploy

1. Go to Deployments tab in Vercel
2. Click the three dots on the latest deployment
3. Click "Redeploy"

### Step 5: Done! 🎉

Your app will be live at: `https://ireoluwa.vercel.app`

---

## 🔐 Login Credentials (for the deployed app)

**Student (Ireoluwa):**
- Email: `[email protected]`
- Password: `student123`

**Guardian (You):**
- Email: `[email protected]`
- Password: `guardian123`

---

## ⚡ Quick Alternative: Use Railway Instead

If Vercel is giving you trouble, Railway is even simpler:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create new project
railway init

# Link to GitHub
railway link

# Deploy
railway up
```

Railway will automatically:
- ✅ Detect it's a Next.js app
- ✅ Work with SQLite (no database changes needed!)
- ✅ Deploy in minutes

Your app will be at: `https://[random-name].railway.app`

---

## 💡 Recommendation

**Try Railway first** - it's simpler because:
1. No database migration needed (SQLite works!)
2. One command deployment
3. Automatic HTTPS
4. Free tier available

If Railway works, you're done in 5 minutes!

---

## 🆘 Need Help?

If you get stuck:
1. Check DEPLOYMENT.md for detailed instructions
2. Make sure Turso login completed successfully
3. Verify environment variables are set correctly in Vercel
4. Check Vercel deployment logs for errors
