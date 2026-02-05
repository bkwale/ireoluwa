import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * COMPREHENSIVE AUDIT: Find ALL placeholder/generic questions
 */
export async function GET() {
  try {
    const allTopics = await prisma.topic.findMany({
      where: { unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } } },
      include: {
        unit: true,
        problems: true
      },
      orderBy: { name: 'asc' }
    });

    const report: any[] = [];
    let totalPlaceholders = 0;

    for (const topic of allTopics) {
      const placeholders = [];

      for (const problem of topic.problems) {
        let isPlaceholder = false;
        const reasons: string[] = [];

        // Check for generic question templates
        if (
          problem.template.includes('key principle of') ||
          problem.template.includes('Which statement about') ||
          problem.template.includes('which concept is most important') ||
          problem.template.includes('Regarding') ||
          problem.template.includes('Which principle applies') ||
          problem.template.includes('Select the correct answer')
        ) {
          isPlaceholder = true;
          reasons.push('Generic question template');
        }

        // Parse solution to check answers
        try {
          const solution = JSON.parse(problem.solution);

          if (solution.correctAnswer) {
            // Check for generic correct answers
            if (
              solution.correctAnswer.includes('Understanding core') ||
              solution.correctAnswer.includes('Applying') ||
              solution.correctAnswer.includes('Analyzing complex') ||
              solution.correctAnswer.includes('fundamentals') ||
              solution.correctAnswer.toLowerCase().includes('correct answer for')
            ) {
              isPlaceholder = true;
              reasons.push(`Generic correct answer: "${solution.correctAnswer}"`);
            }
          }

          if (solution.wrongAnswers) {
            // Check for generic wrong answers
            const genericWrongAnswers = [
              'Memorizing without understanding',
              'Guessing randomly',
              'Ignoring established principles',
              'Incorrect option',
            ];

            const hasGenericWrong = solution.wrongAnswers.some((ans: string) =>
              genericWrongAnswers.some(generic => ans.includes(generic))
            );

            if (hasGenericWrong) {
              isPlaceholder = true;
              reasons.push(`Generic wrong answers: ${JSON.stringify(solution.wrongAnswers)}`);
            }
          }

          if (solution.explanation) {
            // Check for generic explanations
            if (
              solution.explanation.includes('This') &&
              solution.explanation.includes('question tests') &&
              solution.explanation.includes('knowledge')
            ) {
              isPlaceholder = true;
              reasons.push(`Generic explanation: "${solution.explanation}"`);
            }
          }
        } catch (e) {
          // Could not parse solution
        }

        if (isPlaceholder) {
          placeholders.push({
            problemId: problem.id,
            question: problem.template,
            reasons: reasons,
            difficulty: problem.difficulty,
          });
          totalPlaceholders++;
        }
      }

      report.push({
        unit: topic.unit.name,
        topic: topic.name,
        totalProblems: topic.problems.length,
        placeholderCount: placeholders.length,
        placeholders: placeholders.length > 0 ? placeholders : null,
        status: placeholders.length === 0 ? '✅ CLEAN' : '❌ HAS PLACEHOLDERS'
      });
    }

    const summary = {
      totalTopics: allTopics.length,
      topicsWithPlaceholders: report.filter(r => r.placeholderCount > 0).length,
      totalPlaceholders: totalPlaceholders,
      cleanTopics: report.filter(r => r.placeholderCount === 0).length,
    };

    return NextResponse.json({
      summary,
      detailedReport: report,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
