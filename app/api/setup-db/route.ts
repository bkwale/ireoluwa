import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Delete existing users first to avoid conflicts
    await prisma.user.deleteMany({
      where: {
        OR: [
          { username: 'ireoluwa' },
          { username: 'admin' },
          { email: '[email protected]' },
          { email: '[email protected]' },
        ],
      },
    });

    // Create fresh users
    const student = await prisma.user.create({
      data: {
        username: 'ireoluwa',
        email: '[email protected]',
        name: 'Ireoluwa',
        passwordHash: studentPassword,
        role: 'STUDENT',
      },
    });

    const guardian = await prisma.user.create({
      data: {
        username: 'admin',
        email: '[email protected]',
        name: 'Guardian',
        passwordHash: guardianPassword,
        role: 'GUARDIAN',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database setup complete! Users created successfully.',
      credentials: {
        student: { username: 'ireoluwa', password: 'student123' },
        guardian: { username: 'admin', password: 'guardian123' },
      },
      users: {
        student: { id: student.id, username: student.username },
        guardian: { id: guardian.id, username: guardian.username },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        stack: error.stack,
        details: 'Database error occurred'
      },
      { status: 500 }
    );
  }
}
