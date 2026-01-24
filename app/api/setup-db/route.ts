import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // First, try to run migrations
    try {
      console.log('Running database migrations...');
      await execAsync('npx prisma migrate deploy');
      console.log('Migrations completed successfully');
    } catch (migrationError: any) {
      console.log('Migration warning:', migrationError.message);
      // Continue anyway - tables might already exist
    }

    // Check if database is already set up
    let userCount = 0;
    try {
      userCount = await prisma.user.count();
    } catch (error) {
      // Table might not exist yet, that's ok
      console.log('Could not count users, table may not exist yet');
    }

    if (userCount > 0) {
      return NextResponse.json({
        message: 'Database already set up',
        userCount,
      });
    }

    // Create users
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    await prisma.user.createMany({
      data: [
        {
          id: 'student_001',
          username: 'ireoluwa',
          email: '[email protected]',
          name: 'Ireoluwa',
          passwordHash: studentPassword,
          role: 'STUDENT',
        },
        {
          id: 'guardian_001',
          username: 'admin',
          email: '[email protected]',
          name: 'Guardian',
          passwordHash: guardianPassword,
          role: 'GUARDIAN',
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Database setup complete! You can now login.',
      credentials: {
        student: { username: 'ireoluwa', password: 'student123' },
        guardian: { username: 'admin', password: 'guardian123' },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
