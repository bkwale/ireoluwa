import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Check if any admin user exists by email or username
    const existingByEmail = await prisma.user.findUnique({
      where: { email: '[email protected]' },
    });

    const existingByUsername = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    if (existingByEmail || existingByUsername) {
      // Update whichever exists
      const existing = existingByUsername || existingByEmail;

      const admin = await prisma.user.update({
        where: { id: existing!.id },
        data: {
          username: 'admin',
          email: '[email protected]',
          passwordHash: guardianPassword,
          role: 'GUARDIAN',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Admin account updated!',
        credentials: {
          username: 'admin',
          password: 'guardian123',
        },
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      });
    }

    // Create new admin
    const admin = await prisma.user.create({
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
      message: 'Admin account created!',
      credentials: {
        username: 'admin',
        password: 'guardian123',
      },
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
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
