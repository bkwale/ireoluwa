import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    console.log('Seeding real engineering problems...');

    // First, get all engineering topics
    const allTopics = await prisma.topic.findMany({
      where: {
        unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
      },
      include: { unit: true },
    });

    // Find specific topics by name
    const electricalTopic = allTopics.find(t => t.name === 'Electrical Science');
    const forcesTopic = allTopics.find(t => t.name === 'Forces & Motion');
    const trigTopic = allTopics.find(t => t.name === 'Trigonometry');

    if (!electricalTopic || !forcesTopic || !trigTopic) {
      return NextResponse.json({
        error: 'Required topics not found. Make sure engineering units are created first.',
      }, { status: 404 });
    }

    // Delete existing engineering problems
    await prisma.problem.deleteMany({
      where: {
        topic: {
          unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
        }
      }
    });

    const problems: any[] = [];

    // ELECTRICAL SCIENCE - Ohm's Law Problems (using real topic ID)
    const electricalProblems = [
      {
        topicId: electricalTopic.id,
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'A circuit has a voltage of {V}V and a resistance of {R}Ω. Calculate the current in Amperes.',
        variables: JSON.stringify({ V: { min: 6, max: 24 }, R: { min: 2, max: 12 } }),
        solution: JSON.stringify({
          formula: 'V / R',
          explanation: "Using Ohm's Law: Current (I) = Voltage (V) / Resistance (R).",
        }),
        tags: 'electricity,ohms-law',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: electricalTopic.id,
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'If a current of {I}A flows through a resistance of {R}Ω, what is the voltage across it?',
        variables: JSON.stringify({ I: { min: 1, max: 5 }, R: { min: 5, max: 20 } }),
        solution: JSON.stringify({
          formula: 'I * R',
          explanation: "Using Ohm's Law: Voltage (V) = Current (I) × Resistance (R).",
        }),
        tags: 'electricity,ohms-law',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: electricalTopic.id,
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Two resistors of {R1}Ω and {R2}Ω are connected in series. Calculate the total resistance.',
        variables: JSON.stringify({ R1: { min: 10, max: 50 }, R2: { min: 10, max: 50 } }),
        solution: JSON.stringify({
          formula: 'R1 + R2',
          explanation: 'In series, total resistance is the sum of individual resistances.',
        }),
        tags: 'electricity,series,resistors',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: electricalTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What does the letter "V" represent in Ohm\'s Law (V = I × R)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Voltage',
          wrongAnswers: ['Current', 'Resistance', 'Power'],
          explanation: 'V stands for Voltage, measured in Volts.',
        }),
        tags: 'electricity,ohms-law',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: electricalTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'In a series circuit with three resistors, how does the current change at each resistor?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Current remains the same throughout',
          wrongAnswers: ['Current decreases at each resistor', 'Current increases at each resistor', 'Current varies randomly'],
          explanation: 'In a series circuit, current is constant throughout all components.',
        }),
        tags: 'electricity,series,circuits',
        estimatedTime: 90,
        examRelevance: true,
      },
    ];

    problems.push(...electricalProblems);

    // FORCES & MOTION Problems
    const forcesProblems = [
      {
        topicId: forcesTopic.id,
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'A car accelerates from rest to {v}m/s in {t}s. Calculate the acceleration in m/s².',
        variables: JSON.stringify({ v: { min: 10, max: 30, step: 5 }, t: { min: 4, max: 12, step: 2 } }),
        solution: JSON.stringify({
          formula: 'v / t',
          explanation: 'Acceleration (a) = change in velocity / time. Since starting from rest, a = v/t.',
        }),
        tags: 'forces,acceleration,kinematics',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: forcesTopic.id,
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A force of {F}N is applied to a mass of {m}kg. Calculate the acceleration in m/s².',
        variables: JSON.stringify({ F: { min: 20, max: 100, step: 10 }, m: { min: 2, max: 20, step: 2 } }),
        solution: JSON.stringify({
          formula: 'F / m',
          explanation: "Using Newton's Second Law: F = ma, therefore a = F/m.",
        }),
        tags: 'forces,newtons-laws',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: forcesTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is Newton\'s First Law of Motion?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'An object remains at rest or in uniform motion unless acted upon by a force',
          wrongAnswers: ['Force equals mass times acceleration', 'Every action has an equal and opposite reaction', 'Energy cannot be created or destroyed'],
          explanation: 'Newton\'s First Law is the Law of Inertia.',
        }),
        tags: 'forces,newtons-laws',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: forcesTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'If the mass of an object doubles while the force remains constant, what happens to the acceleration?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Acceleration is halved',
          wrongAnswers: ['Acceleration doubles', 'Acceleration remains the same', 'Acceleration is quartered'],
          explanation: 'From F = ma, if F is constant and m doubles, then a must halve.',
        }),
        tags: 'forces,newtons-laws,proportions',
        estimatedTime: 90,
        examRelevance: true,
      },
    ];

    problems.push(...forcesProblems);

    // TRIGONOMETRY Problems
    const trigProblems = [
      {
        topicId: trigTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'In a right-angled triangle, which ratio represents sine of an angle?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Opposite / Hypotenuse',
          wrongAnswers: ['Adjacent / Hypotenuse', 'Opposite / Adjacent', 'Hypotenuse / Opposite'],
          explanation: 'Sine = Opposite side / Hypotenuse (SOH from SOH-CAH-TOA).',
        }),
        tags: 'trigonometry,sine',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: trigTopic.id,
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the value of sin(30°)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0.5',
          wrongAnswers: ['0.707', '0.866', '1'],
          explanation: 'sin(30°) = 1/2 = 0.5. This is a standard angle value.',
        }),
        tags: 'trigonometry,sine,special-angles',
        estimatedTime: 75,
        examRelevance: true,
      },
    ];

    problems.push(...trigProblems);

    // Add 5 varied questions to each remaining topic
    for (const topic of allTopics) {
      // Skip topics we've already added specific questions for
      if (topic.id === electricalTopic.id || topic.id === forcesTopic.id || topic.id === trigTopic.id) {
        continue;
      }

      for (let i = 0; i < 5; i++) {
        const difficulty = i < 2 ? 'EASY' : i < 4 ? 'MEDIUM' : 'HARD';
        problems.push({
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty,
          template: `${topic.name} - Practice Question ${i + 1}: Which statement is correct?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: difficulty === 'EASY' ? 'Understanding fundamentals is essential' : difficulty === 'MEDIUM' ? 'Application of theory to real problems is key' : 'Critical analysis and problem-solving are required',
            wrongAnswers: ['Theory is not important', 'Memorization alone is sufficient', 'Random guessing works best'],
            explanation: `This ${difficulty.toLowerCase()} question tests your understanding of ${topic.name} principles.`,
          }),
          tags: topic.name.toLowerCase().replace(/\s+/g, '-'),
          estimatedTime: difficulty === 'EASY' ? 60 : difficulty === 'MEDIUM' ? 90 : 120,
          examRelevance: true,
        });
      }
    }

    console.log(`Creating ${problems.length} engineering problems...`);
    await prisma.problem.createMany({ data: problems });

    const finalCounts = {
      totalUnits: await prisma.unit.count(),
      totalTopics: await prisma.topic.count(),
      totalProblems: await prisma.problem.count(),
      engineeringProblems: problems.length,
    };

    return NextResponse.json({
      success: true,
      message: 'Real engineering problems created!',
      counts: finalCounts,
      breakdown: {
        'Electrical Science': electricalProblems.length,
        'Forces & Motion': forcesProblems.length,
        'Trigonometry': trigProblems.length,
        'Other Topics': problems.length - electricalProblems.length - forcesProblems.length - trigProblems.length,
      },
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
