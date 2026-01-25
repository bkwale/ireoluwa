import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Check if we already have problems
    const existingProblems = await prisma.problem.count();

    if (existingProblems > 10) {
      return NextResponse.json({
        message: 'Problems already seeded',
        count: existingProblems,
      });
    }

    // Delete existing sample problems
    await prisma.problem.deleteMany({});

    // Generate problems for all 22 topics
    const allProblems = [];

    // Topic 1: Forces and Motion
    allProblems.push(
      {
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the SI unit of force?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Newton (N)',
          wrongAnswers: ['Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          explanation: 'The Newton is the SI unit of force.',
        }),
        tags: 'forces,units',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the formula for calculating kinetic energy?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'KE = ½mv²',
          wrongAnswers: ['KE = mv', 'KE = mgh', 'KE = ma'],
          explanation: 'Kinetic energy equals half the mass times velocity squared.',
        }),
        tags: 'energy,motion',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_001',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'A {mass}kg object accelerates at {acceleration}m/s². Calculate the force applied.',
        variables: JSON.stringify({ mass: { min: 5, max: 50 }, acceleration: { min: 2, max: 10 } }),
        solution: JSON.stringify({
          formula: 'F = ma',
          explanation: 'Force equals mass times acceleration (Newton\'s Second Law).',
        }),
        tags: 'forces,calculations',
        estimatedTime: 120,
        examRelevance: true,
      }
    );

    // Topic 2: Materials and Properties
    allProblems.push(
      {
        topicId: 'topic_002',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which material property describes resistance to deformation?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Hardness',
          wrongAnswers: ['Ductility', 'Malleability', 'Conductivity'],
          explanation: 'Hardness is the resistance of a material to deformation.',
        }),
        tags: 'materials,properties',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_002',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What type of stress is applied when pulling a material?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Tensile stress',
          wrongAnswers: ['Compressive stress', 'Shear stress', 'Torsional stress'],
          explanation: 'Tensile stress occurs when forces pull on a material.',
        }),
        tags: 'materials,stress',
        estimatedTime: 90,
        examRelevance: true,
      }
    );

    // Topic 3: Engineering Mathematics
    allProblems.push(
      {
        topicId: 'topic_003',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'Solve for x: {a}x + {b} = {c}',
        variables: JSON.stringify({ a: { min: 2, max: 10 }, b: { min: 5, max: 20 }, c: { min: 10, max: 50 } }),
        solution: JSON.stringify({
          formula: 'x = (c - b) / a',
          explanation: 'Isolate x by subtracting b from both sides, then divide by a.',
        }),
        tags: 'algebra,equations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_003',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the area of a circle with radius 5cm?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '78.5 cm²',
          wrongAnswers: ['31.4 cm²', '25 cm²', '50 cm²'],
          explanation: 'Area = πr² = 3.14 × 5² = 78.5 cm²',
        }),
        tags: 'geometry,area',
        estimatedTime: 90,
        examRelevance: true,
      }
    );

    // Continue with remaining topics (4-22) - 2 problems each for brevity
    for (let i = 4; i <= 22; i++) {
      const topicId = `topic_${String(i).padStart(3, '0')}`;

      allProblems.push(
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: `Basic concept question for topic ${i}`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Correct Answer',
            wrongAnswers: ['Wrong 1', 'Wrong 2', 'Wrong 3'],
            explanation: 'This is a placeholder problem.',
          }),
          tags: 'basics',
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: `Intermediate question for topic ${i}`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Correct Answer',
            wrongAnswers: ['Wrong 1', 'Wrong 2', 'Wrong 3'],
            explanation: 'This is a placeholder problem.',
          }),
          tags: 'intermediate',
          estimatedTime: 90,
          examRelevance: true,
        }
      );
    }

    await prisma.problem.createMany({
      data: allProblems,
    });

    const problemCount = await prisma.problem.count();

    return NextResponse.json({
      success: true,
      message: `Created ${problemCount} problems across all topics!`,
      problemCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
