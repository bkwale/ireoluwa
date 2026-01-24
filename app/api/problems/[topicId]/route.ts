import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';
import { generateProblem } from '@/lib/problem-engine/generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const session = await getSession();
    const { topicId } = await params;

    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get a random problem from this topic
    const problems = await prisma.problem.findMany({
      where: { topicId },
    });

    if (problems.length === 0) {
      return NextResponse.json(
        { error: 'No problems found for this topic' },
        { status: 404 }
      );
    }

    // Select random problem
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];

    // Generate the problem with random variables
    const generatedProblem = generateProblem(randomProblem);

    return NextResponse.json({ problem: generatedProblem });
  } catch (error) {
    console.error('Error generating problem:', error);
    return NextResponse.json(
      { error: 'Failed to generate problem' },
      { status: 500 }
    );
  }
}
