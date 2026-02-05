import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * COMPLETE REPLACEMENT: Delete ALL engineering problems, add ALL real ones
 * This ensures no placeholder questions remain
 */
export async function GET() {
  try {
    console.log('🗑️  Deleting ALL old engineering problems...');

    // DELETE ALL ENGINEERING PROBLEMS FIRST
    const deleted = await prisma.problem.deleteMany({
      where: {
        topic: {
          unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
        }
      }
    });

    console.log(`✅ Deleted ${deleted.count} old engineering problems`);

    // Get all topics
    const allTopics = await prisma.topic.findMany({ include: { unit: true } });
    const problems: any[] = [];

    const addProblems = (topicName: string, questionArray: any[]) => {
      const topic = allTopics.find(t => t.name === topicName);
      if (topic) {
        questionArray.forEach(q => {
          problems.push({ ...q, topicId: topic.id, examRelevance: true });
        });
      }
    };

    // UNIT 4 - Mathematics

    // Arithmetic & Algebra (10 questions)
    addProblems('Arithmetic & Algebra', [
      {
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'Calculate: {a} + {b} × {c}',
        variables: JSON.stringify({ a: { min: 5, max: 20 }, b: { min: 2, max: 10 }, c: { min: 3, max: 8 } }),
        solution: JSON.stringify({ formula: 'a + (b * c)', explanation: 'Order of operations: multiply first, then add (BODMAS)' }),
        tags: 'arithmetic,bodmas',
        estimatedTime: 90,
      },
      {
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'Calculate: ({a} + {b}) × {c}',
        variables: JSON.stringify({ a: { min: 3, max: 12 }, b: { min: 2, max: 10 }, c: { min: 2, max: 6 } }),
        solution: JSON.stringify({ formula: '(a + b) * c', explanation: 'Brackets first, then multiply' }),
        tags: 'arithmetic,brackets',
        estimatedTime: 90,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Solve for x: 2x + {b} = {c}',
        variables: JSON.stringify({ b: { min: 4, max: 12, step: 2 }, c: { min: 16, max: 30, step: 2 } }),
        solution: JSON.stringify({ formula: '(c - b) / 2', explanation: 'Subtract b from both sides, then divide by 2' }),
        tags: 'algebra,equations',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What does BODMAS stand for?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Brackets, Orders, Division/Multiplication, Addition/Subtraction',
          wrongAnswers: ['Basic Operations Division Multiplication Addition Subtraction', 'Brackets Only Division Multiplication Addition Subtraction', 'Begin Operations Division Multiplication Addition Subtraction'],
          explanation: 'BODMAS is the order of operations',
        }),
        tags: 'arithmetic',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Simplify: 3x + 5x',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '8x',
          wrongAnswers: ['8x²', '15x', '3x²'],
          explanation: 'Combine like terms: 3x + 5x = 8x',
        }),
        tags: 'algebra',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is 25% of 80?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '20',
          wrongAnswers: ['25', '40', '16'],
          explanation: '25% = 1/4, so 80 ÷ 4 = 20',
        }),
        tags: 'percentages',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the square root of 144?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '12',
          wrongAnswers: ['11', '14', '16'],
          explanation: '12 × 12 = 144',
        }),
        tags: 'roots',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'If 5x = 35, what is x²?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '49',
          wrongAnswers: ['7', '25', '35'],
          explanation: 'x = 7, so x² = 49',
        }),
        tags: 'algebra',
        estimatedTime: 120,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate: {a}² - {b}²',
        variables: JSON.stringify({ a: { min: 5, max: 12 }, b: { min: 3, max: 10 } }),
        solution: JSON.stringify({ formula: '(a * a) - (b * b)', explanation: 'Square each number then subtract' }),
        tags: 'squares',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is 10% of 200?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '20',
          wrongAnswers: ['10', '30', '40'],
          explanation: '10% = 1/10, so 200 ÷ 10 = 20',
        }),
        tags: 'percentages',
        estimatedTime: 60,
      },
    ]);

    // Rearranging Formulae (10 questions)
    addProblems('Rearranging Formulae', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make x the subject: y = 2x',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x = y/2',
          wrongAnswers: ['x = 2y', 'x = y - 2', 'x = y + 2'],
          explanation: 'Divide both sides by 2',
        }),
        tags: 'rearranging',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make r the subject: A = πr²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'r = √(A/π)',
          wrongAnswers: ['r = A/π', 'r = πA', 'r = A - π'],
          explanation: 'Divide by π, then take square root',
        }),
        tags: 'rearranging,area',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make b the subject: a = b + c',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'b = a - c',
          wrongAnswers: ['b = a + c', 'b = c - a', 'b = ac'],
          explanation: 'Subtract c from both sides',
        }),
        tags: 'rearranging',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make t the subject: v = u + at',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 't = (v - u)/a',
          wrongAnswers: ['t = v - u - a', 't = a(v - u)', 't = v/a - u'],
          explanation: 'Subtract u, then divide by a',
        }),
        tags: 'rearranging,motion',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Make h the subject: V = πr²h',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'h = V/(πr²)',
          wrongAnswers: ['h = V - πr²', 'h = Vπr²', 'h = √(V/πr)'],
          explanation: 'Divide both sides by πr²',
        }),
        tags: 'rearranging,volume',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make m the subject: E = mc²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'm = E/c²',
          wrongAnswers: ['m = Ec²', 'm = E - c²', 'm = √(E/c)'],
          explanation: 'Divide both sides by c²',
        }),
        tags: 'rearranging,energy',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make F the subject: P = F/A',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'F = PA',
          wrongAnswers: ['F = P/A', 'F = A/P', 'F = P - A'],
          explanation: 'Multiply both sides by A',
        }),
        tags: 'rearranging,pressure',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Make u the subject: v² = u² + 2as',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'u = √(v² - 2as)',
          wrongAnswers: ['u = v² - 2as', 'u = v - 2as', 'u = (v - 2as)²'],
          explanation: 'Subtract 2as, then take square root',
        }),
        tags: 'rearranging,kinematics',
        estimatedTime: 150,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make C the subject: F = (9/5)C + 32',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'C = (5/9)(F - 32)',
          wrongAnswers: ['C = (9/5)F - 32', 'C = 5F/9 + 32', 'C = F - 32'],
          explanation: 'Subtract 32, multiply by 5/9',
        }),
        tags: 'rearranging,temperature',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make d the subject: s = d/t',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'd = st',
          wrongAnswers: ['d = s/t', 'd = t/s', 'd = s - t'],
          explanation: 'Multiply both sides by t',
        }),
        tags: 'rearranging,speed',
        estimatedTime: 75,
      },
    ]);

    console.log(`✅ Creating ${problems.length} real engineering problems...`);
    await prisma.problem.createMany({ data: problems });

    const finalCount = await prisma.problem.count({
      where: {
        topic: {
          unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: '🎉 ALL engineering problems replaced with real questions!',
      deleted: deleted.count,
      created: problems.length,
      finalCount,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
