import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn || session.role !== 'GUARDIAN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all students
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        progress: {
          include: {
            topic: {
              include: {
                unit: true,
              },
            },
          },
        },
        problemAttempts: {
          orderBy: { attemptedAt: 'desc' },
          take: 10,
          include: {
            problem: {
              include: {
                topic: true,
              },
            },
          },
        },
      },
    });

    // Calculate stats for each student
    const studentStats = students.map((student) => {
      const totalAttempts = student.progress.reduce(
        (sum, p) => sum + p.totalAttempts,
        0
      );
      const totalCorrect = student.progress.reduce(
        (sum, p) => sum + p.correctAttempts,
        0
      );
      const overallAccuracy =
        totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;

      const topicProgress = student.progress.map((p) => ({
        topicName: p.topic.name,
        unitName: p.topic.unit.name,
        masteryLevel: p.masteryLevel,
        totalAttempts: p.totalAttempts,
        correctAttempts: p.correctAttempts,
        lastPracticed: p.lastPracticed,
      }));

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        totalAttempts,
        overallAccuracy: overallAccuracy.toFixed(1),
        topicProgress,
        recentAttempts: student.problemAttempts,
      };
    });

    return NextResponse.json({ students: studentStats });
  } catch (error) {
    console.error('Error fetching guardian stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
