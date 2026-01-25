import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Update existing users with correct passwords
    const student = await prisma.user.update({
      where: { username: 'ireoluwa' },
      data: {
        passwordHash: studentPassword,
      },
    });

    // Check if admin exists, if not create it
    let guardian;
    try {
      guardian = await prisma.user.update({
        where: { username: 'admin' },
        data: {
          passwordHash: guardianPassword,
        },
      });
    } catch {
      // Admin doesn't exist, create it
      guardian = await prisma.user.create({
        data: {
          username: 'admin',
          email: '[email protected]',
          name: 'Guardian',
          passwordHash: guardianPassword,
          role: 'GUARDIAN',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Users fixed! Both accounts now have correct passwords.',
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
      },
      { status: 500 }
    );
  }
}
