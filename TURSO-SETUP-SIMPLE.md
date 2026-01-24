# 🚀 Deploy EngineerIQ - Simple 3-Step Guide

## Step 1: Create Turso Database (2 minutes)

1. Go to your Turso dashboard: https://app.turso.tech/wkoleosho/databases

2. Click **"Create Database"** button (top right)

3. Fill in:
   - **Name**: `engineeriq`
   - **Location**: Choose closest to you (e.g., London, Frankfurt)
   - Leave other settings as default

4. Click **"Create"**

5. Once created, you'll see your database. Click on it.

6. You'll see two important values:
   - **Database URL** - looks like: `libsql://engineeriq-[username].turso.io`
   - Click **"Create token"** to get the **Auth Token**

7. Copy BOTH values somewhere safe!

---

## Step 2: Set Up the Database (1 minute)

Run these commands in your terminal (replace with your actual values):

```bash
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/engineeriq"

# Set your Turso credentials
export DATABASE_URL="libsql://YOUR-DATABASE-URL-HERE.turso.io"
export DATABASE_AUTH_TOKEN="YOUR-AUTH-TOKEN-HERE"

# Run the setup script
./setup-database.sh
```

This will seed your database with:
- 2 users (student + guardian)
- 22 topics across 3 units
- 5 sample problems

---

## Step 3: Deploy to Vercel (2 minutes)

### A. Add Environment Variables

1. Go to: https://vercel.com
2. Click on your **"ireoluwa"** project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables (click "Add New" for each):

   **Variable 1:**
   - Name: `DATABASE_URL`
   - Value: (paste your Turso database URL)
   - Apply to: All (Production, Preview, Development)

   **Variable 2:**
   - Name: `DATABASE_AUTH_TOKEN`
   - Value: (paste your Turso auth token)
   - Apply to: All

   **Variable 3:**
   - Name: `SESSION_SECRET`
   - Value: Run this command to generate: `openssl rand -base64 32`
   - Apply to: All

5. Click **"Save"** for each

### B. Redeploy

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **three dots (•••)** on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

### C. Wait for Deployment

- Watch the deployment logs
- Should take 1-2 minutes
- When you see **"✅ Ready"**, it's done!

---

## 🎉 Done! Access Your App

Your app is now live at:
- **https://ireoluwa.vercel.app** (or whatever your Vercel URL is)

### Login Credentials:

**Student (Ireoluwa):**
- Email: `[email protected]`
- Password: `student123`

**Guardian (You):**
- Email: `[email protected]`
- Password: `guardian123`

---

## 📱 Share with Ireoluwa

Just send him the link:
- **https://your-app.vercel.app**
- Username: `[email protected]`
- Password: `student123`

He can access from anywhere - home, school, phone, tablet!

---

## ⚠️ Troubleshooting

### If deployment fails:

1. **Check environment variables** - Make sure all 3 are added correctly
2. **Check deployment logs** - Look for specific error messages
3. **Try redeploying** - Sometimes it just needs a retry

### If database connection fails:

1. **Verify DATABASE_URL** - Should start with `libsql://`
2. **Verify AUTH_TOKEN** - Should be a long string
3. **Check Turso database is active** - Go to Turso dashboard

### If login doesn't work:

1. Make sure database was seeded successfully
2. Check the setup script output for errors
3. You may need to run the seed script again

---

## 💡 Quick Commands Reference

```bash
# Re-seed database if needed
export DATABASE_URL="your-url"
export DATABASE_AUTH_TOKEN="your-token"
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/engineeriq"
npx tsx prisma/seed.ts

# Check Vercel deployment status
vercel logs --prod

# View your live site
open https://your-app.vercel.app
```

---

## 🎯 Summary

Total time: **5 minutes**

1. ✅ Create Turso database → Get URL + Token
2. ✅ Run setup script → Seeds data
3. ✅ Add variables to Vercel → Redeploy
4. ✅ Share link with Ireoluwa → He's learning!

**That's it! EngineerIQ is now accessible from anywhere in the world!** 🌍
