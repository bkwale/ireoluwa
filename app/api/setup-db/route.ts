import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Check if users already exist
    const userCount = await prisma.user.count().catch(() => 0);

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
      {
        error: error.message,
        code: error.code,
        details: 'Make sure database tables exist. Run migrations first if needed.'
      },
      { status: 500 }
    );
  }
}
