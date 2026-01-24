import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function resetAndSeed() {
  console.log('🔧 Resetting and seeding Turso database...');
  console.log('📍 Database:', process.env.DATABASE_URL);
  console.log('');

  try {
    // Drop all tables
    console.log('🗑️  Dropping existing tables...');
    const dropStatements = [
      'DROP TABLE IF EXISTS "ProblemAttempt"',
      'DROP TABLE IF EXISTS "Progress"',
      'DROP TABLE IF EXISTS "StudySession"',
      'DROP TABLE IF EXISTS "Problem"',
      'DROP TABLE IF EXISTS "Subtopic"',
      'DROP TABLE IF EXISTS "Topic"',
      'DROP TABLE IF EXISTS "Unit"',
      'DROP TABLE IF EXISTS "User"',
    ];

    for (const statement of dropStatements) {
      await client.execute(statement);
      console.log(`✅ Executed: ${statement}`);
    }

    console.log('');
    console.log('📋 Creating tables with new schema...');

    // Read the initial migration SQL
    const initMigrationSQL = fs.readFileSync('./prisma/migrations/20260124162350_init/migration.sql', 'utf-8');

    // Clean and split SQL
    const cleanSQL = initMigrationSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');

    const statements = cleanSQL
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => s.length > 10);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 50).replace(/\s+/g, ' ');
      console.log(`⏳ [${i + 1}/${statements.length}] ${preview}...`);

      try {
        await client.execute(statement);
        console.log(`✅ Statement ${i + 1} completed`);
      } catch (error) {
        console.error(`❌ Error in statement ${i + 1}:`, error.message);
        throw error;
      }
    }

    console.log('');
    console.log('🔧 Adding username column...');

    // Alter User table to add username
    await client.execute(`
      CREATE TABLE "User_new" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "username" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "passwordHash" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'STUDENT',
        "enrolledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "targetExamDate" DATETIME,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);

    await client.execute('DROP TABLE "User"');
    await client.execute('ALTER TABLE "User_new" RENAME TO "User"');
    await client.execute('CREATE UNIQUE INDEX "User_username_key" ON "User"("username")');
    await client.execute('CREATE UNIQUE INDEX "User_email_key" ON "User"("email")');

    console.log('✅ Username column added');
    console.log('');
    console.log('🌱 Seeding database...');

    // Hash passwords
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Create users with usernames
    await client.execute({
      sql: `INSERT INTO "User" (id, username, email, name, passwordHash, role, enrolledAt, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: ['clzstudent001', 'ireoluwa', '[email protected]', 'Ireoluwa', studentPassword, 'STUDENT']
    });

    await client.execute({
      sql: `INSERT INTO "User" (id, username, email, name, passwordHash, role, enrolledAt, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: ['clzguardian001', 'admin', '[email protected]', 'Guardian', guardianPassword, 'GUARDIAN']
    });

    console.log('✅ Created users: ireoluwa (student) and admin (guardian)');

    console.log('');
    console.log('🎉 Reset and seed completed successfully!');
    console.log('');
    console.log('📝 Login credentials:');
    console.log('   Student: username: ireoluwa / password: student123');
    console.log('   Guardian: username: admin / password: guardian123');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

resetAndSeed();
