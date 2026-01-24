import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get all users but don't expose passwords
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      userCount: users.length,
      users: users,
      databaseInfo: {
        hasUsernameField: users.length > 0 && 'username' in users[0],
        sampleUser: users[0] || null,
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
