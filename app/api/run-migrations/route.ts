import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

export async function GET() {
  try {

    const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      return NextResponse.json(
        { error: 'No database connection string configured' },
        { status: 500 }
      );
    }

    const pool = new Pool({ connectionString });

    // Run the migration SQL directly
    const migrationSQL = `
      -- CreateTable
      CREATE TABLE IF NOT EXISTS "User" (
          "id" TEXT NOT NULL,
          "username" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "passwordHash" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'STUDENT',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );

      -- CreateTable
      CREATE TABLE IF NOT EXISTS "Topic" (
          "id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "order" INTEGER NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
      );

      -- CreateTable
      CREATE TABLE IF NOT EXISTS "Problem" (
          "id" TEXT NOT NULL,
          "topicId" TEXT NOT NULL,
          "question" TEXT NOT NULL,
          "correctAnswer" TEXT NOT NULL,
          "wrongAnswers" TEXT[],
          "explanation" TEXT NOT NULL,
          "difficulty" TEXT NOT NULL,
          "order" INTEGER NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
      );

      -- CreateTable
      CREATE TABLE IF NOT EXISTS "ProblemAttempt" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "problemId" TEXT NOT NULL,
          "isCorrect" BOOLEAN NOT NULL,
          "userAnswer" TEXT NOT NULL,
          "timeSpent" INTEGER NOT NULL,
          "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT "ProblemAttempt_pkey" PRIMARY KEY ("id")
      );

      -- CreateTable
      CREATE TABLE IF NOT EXISTS "UserProgress" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "topicId" TEXT NOT NULL,
          "completed" BOOLEAN NOT NULL DEFAULT false,
          "totalAttempts" INTEGER NOT NULL DEFAULT 0,
          "correctAttempts" INTEGER NOT NULL DEFAULT 0,
          "accuracy" DOUBLE PRECISION,
          "averageTime" DOUBLE PRECISION,
          "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "endedAt" TIMESTAMP(3),

          CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
      );

      -- CreateIndex
      CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");

      -- CreateIndex
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

      -- CreateIndex
      CREATE UNIQUE INDEX IF NOT EXISTS "UserProgress_userId_topicId_key" ON "UserProgress"("userId", "topicId");

      -- AddForeignKey
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'Problem_topicId_fkey'
        ) THEN
          ALTER TABLE "Problem" ADD CONSTRAINT "Problem_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$;

      -- AddForeignKey
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'ProblemAttempt_userId_fkey'
        ) THEN
          ALTER TABLE "ProblemAttempt" ADD CONSTRAINT "ProblemAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$;

      -- AddForeignKey
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'ProblemAttempt_problemId_fkey'
        ) THEN
          ALTER TABLE "ProblemAttempt" ADD CONSTRAINT "ProblemAttempt_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$;

      -- AddForeignKey
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'UserProgress_userId_fkey'
        ) THEN
          ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$;

      -- AddForeignKey
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'UserProgress_topicId_fkey'
        ) THEN
          ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END $$;
    `;

    await pool.query(migrationSQL);
    await pool.end();

    return NextResponse.json({
      success: true,
      message: 'Database schema created successfully! Now run /api/setup-db to create users.',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
