import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';
import { checkAnswer } from '@/lib/problem-engine/generator';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { problemId, topicId, userAnswer, correctAnswer, timeSpent, variables } =
      await request.json();

    // Check answer based on type
    let isCorrect = false;

    // For multiple choice, do exact string comparison
    if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
      isCorrect = userAnswer.trim() === correctAnswer.trim();
    } else {
      // For numeric answers, use tolerance-based comparison
      const userNum = parseFloat(userAnswer);
      const correctNum = typeof correctAnswer === 'number'
        ? correctAnswer
        : parseFloat(correctAnswer.toString());
      isCorrect = checkAnswer(userNum, correctNum);
    }

    // Record the attempt
    const attempt = await prisma.problemAttempt.create({
      data: {
        userId: session.userId,
        problemId,
        generatedVariables: JSON.stringify(variables),
        userAnswer: userAnswer.toString(),
        isCorrect,
        timeSpent,
      },
    });

    // Update or create progress
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_topicId: {
          userId: session.userId,
          topicId,
        },
      },
    });

    if (existingProgress) {
      const newTotalAttempts = existingProgress.totalAttempts + 1;
      const newCorrectAttempts = existingProgress.correctAttempts + (isCorrect ? 1 : 0);
      const newAccuracy = newCorrectAttempts / newTotalAttempts;

      // Calculate new mastery level (weighted average of accuracy)
      const newMasteryLevel = Math.min(1.0, newAccuracy * 0.7 + (newTotalAttempts / 50) * 0.3);

      await prisma.progress.update({
        where: { id: existingProgress.id },
        data: {
          totalAttempts: newTotalAttempts,
          correctAttempts: newCorrectAttempts,
          masteryLevel: newMasteryLevel,
          lastPracticed: new Date(),
        },
      });
    } else {
      await prisma.progress.create({
        data: {
          userId: session.userId,
          topicId,
          totalAttempts: 1,
          correctAttempts: isCorrect ? 1 : 0,
          masteryLevel: isCorrect ? 0.1 : 0.0,
          lastPracticed: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      isCorrect,
      correctAnswer,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
