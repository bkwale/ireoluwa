import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn || session.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.userId!;

    // Get all attempts
    const attempts = await prisma.problemAttempt.findMany({
      where: { userId },
      include: {
        problem: {
          include: {
            topic: {
              include: {
                unit: true
              }
            }
          }
        }
      }
    });

    // Calculate overall stats
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.isCorrect).length;
    const overallSuccessRate = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

    // Calculate average time
    const totalTime = attempts.reduce((sum, a) => sum + a.timeSpent, 0);
    const averageTime = totalAttempts > 0 ? Math.round(totalTime / totalAttempts) : 0;

    // Stats by topic
    const topicStats = new Map<string, {
      topicId: string;
      topicName: string;
      unitName: string;
      total: number;
      correct: number;
      successRate: number;
      averageTime: number;
    }>();

    attempts.forEach(attempt => {
      const topicId = attempt.problem.topicId;
      const topicName = attempt.problem.topic.name;
      const unitName = attempt.problem.topic.unit.name;

      if (!topicStats.has(topicId)) {
        topicStats.set(topicId, {
          topicId,
          topicName,
          unitName,
          total: 0,
          correct: 0,
          successRate: 0,
          averageTime: 0,
        });
      }

      const stats = topicStats.get(topicId)!;
      stats.total++;
      if (attempt.isCorrect) stats.correct++;
      stats.averageTime = ((stats.averageTime * (stats.total - 1)) + attempt.timeSpent) / stats.total;
    });

    // Calculate success rate for each topic
    const topicStatsArray = Array.from(topicStats.values()).map(stat => ({
      ...stat,
      successRate: stat.total > 0 ? (stat.correct / stat.total) * 100 : 0,
      averageTime: Math.round(stat.averageTime)
    }));

    // Find weak areas (success rate < 60%)
    const weakAreas = topicStatsArray
      .filter(t => t.total >= 3 && t.successRate < 60)
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, 5);

    // Find strong areas (success rate >= 80%)
    const strongAreas = topicStatsArray
      .filter(t => t.total >= 3 && t.successRate >= 80)
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);

    return NextResponse.json({
      overall: {
        totalAttempts,
        correctAttempts,
        successRate: Math.round(overallSuccessRate),
        averageTime,
      },
      topicStats: topicStatsArray,
      weakAreas,
      strongAreas,
    });
  } catch (error: any) {
    console.error('Error fetching student stats:', error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
