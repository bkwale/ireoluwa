# EngineerIQ - T-Level Engineering Practice Platform

An interactive web application designed to help T-level engineering students practice and master Units 4, 5, and 6 through interactive problem-solving with step-by-step solutions.

## 🎯 Purpose

Built specifically for **Ireoluwa** (Manchester College, Openshaw) to support his T-level engineering studies with:
- **Unit 4**: Essential Maths (Arithmetic, Algebra, Trigonometry, Calculus)
- **Unit 5**: Essential Science (Forces, Energy, Electrical Science, Waves)
- **Unit 6**: Materials & Properties (Metals, Polymers, Mechanical/Thermal Properties)

## 🚀 Current Status

**Phase 2 - Core MVP: COMPLETE ✅**

### What's Built:
- ✅ Next.js 16 with TypeScript
- ✅ SQLite Database with Prisma ORM
- ✅ Complete database schema with all models
- ✅ Seed data with 22 topics across 3 units
- ✅ Sample problems for testing
- ✅ Authentication system with session management
- ✅ Login page with role-based routing
- ✅ Student dashboard with progress tracking
- ✅ Problem generator engine
- ✅ Interactive problem solving UI with answer validation
- ✅ Guardian monitoring dashboard
- ✅ Progress tracking and mastery calculation

### What's Next (Future Enhancements):
- 📝 More problem types for all topics
- 🎨 Math rendering with KaTeX
- 📊 Advanced analytics charts
- 🎯 Visual diagrams (circuits, forces, geometry)
- 💾 Export progress reports
- 📱 Mobile responsive improvements

## 📊 Database Structure

### Users
- **Student**: `[email protected]` / `student123`
- **Guardian**: `[email protected]` / `guardian123`

### Units & Topics
- **Unit 4 - Essential Maths**: 8 topics (Arithmetic → Integration)
- **Unit 5 - Essential Science**: 6 topics (Forces → Chemical Reactions)
- **Unit 6 - Materials**: 8 topics (Metals → Corrosion)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Math Rendering**: KaTeX (planned)
- **Charts**: Recharts (planned)
- **Authentication**: Custom JWT-based (in progress)

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma migrate dev

# Seed database with initial data
npx tsx prisma/seed.ts

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗂️ Project Structure

```
engineeriq/
├── app/                    # Next.js app directory
│   ├── login/             # Login page (pending)
│   ├── dashboard/         # Student dashboard (pending)
│   └── practice/          # Practice mode (pending)
├── components/            # React components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility libraries
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # Authentication helpers
│   ├── utils.ts          # Utility functions
│   └── problem-engine/   # Problem generation (pending)
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed data script
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## 🎓 Features (Planned)

### For Students (Ireoluwa):
- 📚 Practice problems with randomized variables
- 📝 Step-by-step solution walkthroughs
- 📊 Progress tracking by topic
- 🎯 Adaptive difficulty based on performance
- 🔥 Streak tracking for daily practice
- 📖 Quick reference materials
- 🎨 Visual aids (diagrams, graphs, simulations)

### For Guardians:
- 👀 Monitor student activity and time spent
- 📈 View progress reports by unit/topic
- 📉 Identify weak areas
- 📅 Track study sessions
- 📄 Export progress reports

## 🔑 Login Credentials

**Student Account**
- Email: `[email protected]`
- Password: `student123`

**Guardian Account** (for monitoring)
- Email: `[email protected]`
- Password: `guardian123`

## 📝 Sample Problems Included

1. **Trigonometry** (Unit 4)
   - Right-angled triangle calculations
   - Sine rule applications

2. **Forces & Motion** (Unit 5)
   - Acceleration calculations
   - Newton's second law

3. **Mechanical Properties** (Unit 6)
   - Stress calculations

## 🚧 Development Roadmap

### Phase 2: Core Features (Next Session)
- [ ] Authentication UI with login page
- [ ] Student dashboard with topic cards
- [ ] Problem generator for Unit 4 topics
- [ ] Problem display with KaTeX rendering
- [ ] Answer validation system

### Phase 3: Enhanced Features
- [ ] Problem generators for Units 5 & 6
- [ ] Visual diagrams (circuits, forces, geometry)
- [ ] Step-by-step solution system
- [ ] Progress tracking and analytics

### Phase 4: Guardian Features
- [ ] Guardian monitoring dashboard
- [ ] Activity reports
- [ ] Progress visualization charts

### Phase 5: Polish & Deploy
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] User testing with Ireoluwa

## 🔧 Environment Variables

The `.env` file is already configured with:

```env
DATABASE_URL="file:./dev.db"
```

## 📚 Documentation

- **Database Schema**: See `prisma/schema.prisma` for complete data model
- **Seed Data**: Check `prisma/seed.ts` for initial data structure
- **Auth Helpers**: Review `lib/auth.ts` for authentication functions

## 🙏 Acknowledgments

Built with ❤️ to support Ireoluwa's engineering education journey.

---

**Status**: Working MVP - Ready for Testing & Use! 🎉
**Last Updated**: January 24, 2026

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/bkwale/ireoluwa.git
cd ireoluwa
npm install

# Set up database
npx prisma generate
npx tsx prisma/seed.ts

# Run the app
npm run dev
```

Open http://localhost:3000 and login with:
- Student: `[email protected]` / `student123`
- Guardian: `[email protected]` / `guardian123`
