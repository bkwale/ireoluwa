import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Force add engineering problems - no checks, just add them
 */
export async function GET() {
  try {
    console.log('Force adding engineering problems...');

    // Get all engineering topics
    const engineeringTopics = await prisma.topic.findMany({
      where: {
        unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
      },
      include: { unit: true },
    });

    console.log(`Found ${engineeringTopics.length} engineering topics`);

    // Delete existing engineering problems first
    await prisma.problem.deleteMany({
      where: {
        topic: {
          unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
        }
      }
    });

    console.log('Deleted old engineering problems');

    const problems: any[] = [];

    // Add 10 problems per topic
    for (const topic of engineeringTopics) {
      console.log(`Adding problems for ${topic.name}...`);

      for (let i = 0; i < 10; i++) {
        const difficulty = i < 3 ? 'EASY' : i < 7 ? 'MEDIUM' : 'HARD';
        problems.push({
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty,
          template: `${topic.name} - Question ${i + 1}: What is an important principle?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: difficulty === 'EASY' ? 'Basic fundamentals' : difficulty === 'MEDIUM' ? 'Applied knowledge' : 'Advanced analysis',
            wrongAnswers: ['Random approach', 'Trial and error only', 'Ignoring theory'],
            explanation: `This ${difficulty.toLowerCase()} level question tests your understanding of ${topic.name}.`,
          }),
          tags: topic.name.toLowerCase().replace(/\s+/g, '-'),
          estimatedTime: difficulty === 'EASY' ? 60 : difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }
    }

    console.log(`Creating ${problems.length} problems...`);
    await prisma.problem.createMany({ data: problems });

    const finalCounts = {
      totalUnits: await prisma.unit.count(),
      totalTopics: await prisma.topic.count(),
      totalProblems: await prisma.problem.count(),
      engineeringTopics: engineeringTopics.length,
      engineeringProblems: problems.length,
    };

    return NextResponse.json({
      success: true,
      message: 'Engineering problems forcefully added!',
      counts: finalCounts,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
