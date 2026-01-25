import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    // Get all existing users
    const allUsers = await prisma.user.findMany();

    // Check for ireoluwa
    const ireoluwa = allUsers.find(u => u.username === 'ireoluwa' || u.email === '[email protected]');

    // Check for admin
    const admin = allUsers.find(u => u.username === 'admin' || u.email === '[email protected]');

    const results = [];

    // Ensure ireoluwa exists
    if (ireoluwa) {
      await prisma.user.update({
        where: { id: ireoluwa.id },
        data: {
          username: 'ireoluwa',
          email: '[email protected]',
          name: 'Ireoluwa',
          passwordHash: studentPassword,
          role: 'STUDENT',
        },
      });
      results.push('Ireoluwa account updated');
    } else {
      await prisma.user.create({
        data: {
          username: 'ireoluwa',
          email: '[email protected]',
          name: 'Ireoluwa',
          passwordHash: studentPassword,
          role: 'STUDENT',
        },
      });
      results.push('Ireoluwa account created');
    }

    // Ensure admin exists (check again after ireoluwa update)
    const adminCheck = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    if (adminCheck) {
      await prisma.user.update({
        where: { id: adminCheck.id },
        data: {
          username: 'admin',
          email: '[email protected]',
          name: 'Guardian',
          passwordHash: guardianPassword,
          role: 'GUARDIAN',
        },
      });
      results.push('Admin account updated');
    } else {
      await prisma.user.create({
        data: {
          username: 'admin',
          email: '[email protected]',
          name: 'Guardian',
          passwordHash: guardianPassword,
          role: 'GUARDIAN',
        },
      });
      results.push('Admin account created');
    }

    // Verify both exist
    const finalUsers = await prisma.user.findMany({
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
      message: 'Both accounts ensured!',
      actions: results,
      credentials: {
        student: { username: 'ireoluwa', password: 'student123' },
        guardian: { username: 'admin', password: 'guardian123' },
      },
      users: finalUsers,
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
