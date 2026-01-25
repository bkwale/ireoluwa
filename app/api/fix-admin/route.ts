import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    console.log('Starting admin fix...');

    // Check all existing users
    const allUsers = await prisma.user.findMany({
      select: { id: true, username: true, email: true, role: true }
    });
    console.log('Current users:', allUsers);

    // Check if admin exists by username or email
    const adminByUsername = await prisma.user.findUnique({
      where: { username: 'admin' }
    });
    const adminByEmail = await prisma.user.findUnique({
      where: { email: 'admin@engineeriq.com' }
    });

    const guardianPassword = await bcrypt.hash('guardian123', 10);

    let admin;
    let action;

    if (adminByUsername) {
      // Update existing admin by username
      admin = await prisma.user.update({
        where: { id: adminByUsername.id },
        data: {
          username: 'admin',
          name: 'Admin',
          email: 'admin@engineeriq.com',
          passwordHash: guardianPassword,
          role: 'GUARDIAN' as const,
        }
      });
      action = 'updated (by username)';
    } else if (adminByEmail) {
      // Update existing admin by email
      admin = await prisma.user.update({
        where: { id: adminByEmail.id },
        data: {
          username: 'admin',
          name: 'Admin',
          email: 'admin@engineeriq.com',
          passwordHash: guardianPassword,
          role: 'GUARDIAN' as const,
        }
      });
      action = 'updated (by email)';
    } else {
      // Create new admin
      admin = await prisma.user.create({
        data: {
          username: 'admin',
          name: 'Admin',
          email: 'admin@engineeriq.com',
          passwordHash: guardianPassword,
          role: 'GUARDIAN' as const,
        }
      });
      action = 'created';
    }

    // Verify admin credentials
    const adminCheck = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    const passwordValid = adminCheck
      ? await bcrypt.compare('guardian123', adminCheck.passwordHash)
      : false;

    // Verify Ireoluwa account not affected
    const ireoluwa = await prisma.user.findUnique({
      where: { username: 'ireoluwa' }
    });

    const ireoluwaPasswordValid = ireoluwa
      ? await bcrypt.compare('student123', ireoluwa.passwordHash)
      : false;

    // Final user count
    const finalUsers = await prisma.user.findMany({
      select: { username: true, email: true, role: true }
    });

    return NextResponse.json({
      success: true,
      action,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        passwordValid,
      },
      ireoluwaCheck: ireoluwa ? {
        username: ireoluwa.username,
        email: ireoluwa.email,
        role: ireoluwa.role,
        passwordValid: ireoluwaPasswordValid,
        notAffected: ireoluwa.username === 'ireoluwa' && ireoluwa.role === 'STUDENT' && ireoluwaPasswordValid,
      } : {
        error: 'Ireoluwa account not found!',
      },
      totalUsers: finalUsers.length,
      allUsers: finalUsers,
    });
  } catch (error: any) {
    console.error('Error fixing admin:', error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
