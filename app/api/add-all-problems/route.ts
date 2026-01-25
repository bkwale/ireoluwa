import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Delete ALL existing problems first
    await prisma.problem.deleteMany({});

    // Get all topics
    const topics = await prisma.topic.findMany({
      orderBy: { order: 'asc' },
    });

    if (topics.length === 0) {
      return NextResponse.json({
        error: 'No topics found. Run seed-topics first.',
      }, { status: 404 });
    }

    // Add 3 problems to EACH topic
    const allProblems = [];

    for (const topic of topics) {
      // Problem 1: Easy
      allProblems.push({
        topicId: topic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: `Basic question about ${topic.name}`,
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Correct Answer',
          wrongAnswers: ['Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3'],
          explanation: `This is a basic concept in ${topic.name}.`,
        }),
        tags: 'basics',
        estimatedTime: 60,
        examRelevance: true,
      });

      // Problem 2: Medium
      allProblems.push({
        topicId: topic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: `Intermediate question about ${topic.name}`,
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Correct Answer',
          wrongAnswers: ['Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3'],
          explanation: `This requires understanding of ${topic.name} principles.`,
        }),
        tags: 'intermediate',
        estimatedTime: 90,
        examRelevance: true,
      });

      // Problem 3: Hard
      allProblems.push({
        topicId: topic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: `Advanced question about ${topic.name}`,
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Correct Answer',
          wrongAnswers: ['Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3'],
          explanation: `This is an advanced concept in ${topic.name}.`,
        }),
        tags: 'advanced',
        estimatedTime: 120,
        examRelevance: true,
      });
    }

    // Create all problems at once
    await prisma.problem.createMany({
      data: allProblems,
    });

    const problemCount = await prisma.problem.count();

    return NextResponse.json({
      success: true,
      message: `Added ${problemCount} problems across ${topics.length} topics (3 per topic)`,
      topicCount: topics.length,
      problemCount,
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
