import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateProblem } from '@/lib/problem-engine/generator';

export async function GET() {
  try {
    // Get a few engineering problems to test
    const problems = await prisma.problem.findMany({
      take: 5,
      include: { topic: true },
    });

    const testResults = [];

    for (const problem of problems) {
      const solution = JSON.parse(problem.solution);
      const generated = generateProblem(problem);

      testResults.push({
        topic: problem.topic.name,
        question: generated.question,
        type: generated.type,
        storedCorrectAnswer: solution.correctAnswer,
        generatedCorrectAnswer: generated.correctAnswer,
        options: generated.options,
        match: generated.options?.includes(generated.correctAnswer as string),
        rawSolution: solution,
      });
    }

    return NextResponse.json({
      success: true,
      testResults,
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
