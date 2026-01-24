import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Try to upsert ireoluwa
    const student = await prisma.user.upsert({
      where: { username: 'ireoluwa' },
      update: {
        passwordHash: studentPassword,
        email: '[email protected]',
        name: 'Ireoluwa',
        role: 'STUDENT',
      },
      create: {
        username: 'ireoluwa',
        email: '[email protected]',
        name: 'Ireoluwa',
        passwordHash: studentPassword,
        role: 'STUDENT',
      },
    });

    // Try to upsert admin
    const guardian = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {
        passwordHash: guardianPassword,
        email: '[email protected]',
        name: 'Guardian',
        role: 'GUARDIAN',
      },
      create: {
        username: 'admin',
        email: '[email protected]',
        name: 'Guardian',
        passwordHash: guardianPassword,
        role: 'GUARDIAN',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database setup complete! Users created/updated.',
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
        details: 'Database error occurred'
      },
      { status: 500 }
    );
  }
}
