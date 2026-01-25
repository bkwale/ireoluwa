import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');

    if (topicId) {
      // Get problems for specific topic
      const problems = await prisma.problem.findMany({
        where: { topicId },
        select: {
          id: true,
          topicId: true,
          type: true,
          difficulty: true,
          template: true,
        },
      });

      return NextResponse.json({
        topicId,
        problemCount: problems.length,
        problems,
      });
    }

    // Get all problems grouped by topic
    const allProblems = await prisma.problem.findMany({
      select: {
        id: true,
        topicId: true,
        type: true,
        difficulty: true,
      },
    });

    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const problemsByTopic = topics.map(topic => ({
      topicId: topic.id,
      topicName: topic.name,
      problemCount: allProblems.filter(p => p.topicId === topic.id).length,
    }));

    return NextResponse.json({
      totalProblems: allProblems.length,
      totalTopics: topics.length,
      problemsByTopic,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
