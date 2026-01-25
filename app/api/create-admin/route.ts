import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    if (existingAdmin) {
      // Update password
      const admin = await prisma.user.update({
        where: { username: 'admin' },
        data: {
          passwordHash: guardianPassword,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Admin password updated!',
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
