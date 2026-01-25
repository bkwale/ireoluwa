import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Find admin user
    const admin = await prisma.user.findUnique({
      where: { username: 'admin' },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true,
      },
    });

    if (!admin) {
      return NextResponse.json({
        error: 'Admin user not found',
      });
    }

    // Test if the password 'guardian123' matches
    const testPassword = 'guardian123';
    const isValid = await bcrypt.compare(testPassword, admin.passwordHash);

    return NextResponse.json({
      adminExists: true,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      passwordHashLength: admin.passwordHash.length,
      passwordStartsWith: admin.passwordHash.substring(0, 7),
      testPasswordMatches: isValid,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
