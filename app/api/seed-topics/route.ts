import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Check if units already exist
    const existingUnits = await prisma.unit.count();

    if (existingUnits > 0) {
      const topicCount = await prisma.topic.count();
      return NextResponse.json({
        message: 'Data already seeded',
        unitCount: existingUnits,
        topicCount,
      });
    }

    // Create Units first
    const units = [
      {
        id: 'unit_001',
        code: 'UNIT1',
        name: 'Engineering Principles',
        description: 'Core engineering principles and fundamentals',
        order: 1,
      },
      {
        id: 'unit_002',
        code: 'UNIT2',
        name: 'Engineering Design',
        description: 'Design processes and technical drawing',
        order: 2,
      },
      {
        id: 'unit_003',
        code: 'UNIT3',
        name: 'Engineering Systems',
        description: 'Mechanical, electrical and control systems',
        order: 3,
      },
    ];

    await prisma.unit.createMany({
      data: units,
    });

    // All 22 T-Level Engineering topics mapped to units
    const topics = [
      // Unit 1: Engineering Principles
      {
        id: 'topic_001',
        unitId: 'unit_001',
        name: 'Forces and Motion',
        description: 'Fundamental principles of forces, motion, and energy',
        order: 1,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_002',
        unitId: 'unit_001',
        name: 'Materials and Properties',
        description: 'Properties and processing of engineering materials',
        order: 2,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_003',
        unitId: 'unit_001',
        name: 'Engineering Mathematics',
        description: 'Mathematical concepts and calculations for engineering',
        order: 3,
        difficulty: 'HARD',
      },
      {
        id: 'topic_004',
        unitId: 'unit_001',
        name: 'Statics and Dynamics',
        description: 'Forces, moments, and motion analysis',
        order: 4,
        difficulty: 'HARD',
      },
      {
        id: 'topic_005',
        unitId: 'unit_001',
        name: 'Thermodynamics',
        description: 'Heat, temperature, and energy transfer',
        order: 5,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_006',
        unitId: 'unit_001',
        name: 'Fluid Mechanics',
        description: 'Properties and behavior of fluids',
        order: 6,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_007',
        unitId: 'unit_001',
        name: 'Health and Safety',
        description: 'Engineering health and safety regulations',
        order: 7,
        difficulty: 'EASY',
      },

      // Unit 2: Engineering Design
      {
        id: 'topic_008',
        unitId: 'unit_002',
        name: 'Technical Drawing',
        description: 'Reading and creating engineering drawings',
        order: 1,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_009',
        unitId: 'unit_002',
        name: 'CAD and Design',
        description: 'Computer-aided design principles',
        order: 2,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_010',
        unitId: 'unit_002',
        name: 'Manufacturing Processes',
        description: 'Common manufacturing and fabrication techniques',
        order: 3,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_011',
        unitId: 'unit_002',
        name: 'Quality Control',
        description: 'Quality assurance and control in engineering',
        order: 4,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_012',
        unitId: 'unit_002',
        name: 'Testing and Measurement',
        description: 'Measurement techniques and testing procedures',
        order: 5,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_013',
        unitId: 'unit_002',
        name: 'Welding and Joining',
        description: 'Methods of joining materials',
        order: 6,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_014',
        unitId: 'unit_002',
        name: 'Sustainable Engineering',
        description: 'Environmental considerations and sustainability',
        order: 7,
        difficulty: 'EASY',
      },
      {
        id: 'topic_015',
        unitId: 'unit_002',
        name: 'Project Management',
        description: 'Planning and managing engineering projects',
        order: 8,
        difficulty: 'EASY',
      },

      // Unit 3: Engineering Systems
      {
        id: 'topic_016',
        unitId: 'unit_003',
        name: 'Mechanical Systems',
        description: 'Mechanical components and systems',
        order: 1,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_017',
        unitId: 'unit_003',
        name: 'Electrical Systems',
        description: 'Basic electrical circuits and components',
        order: 2,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_018',
        unitId: 'unit_003',
        name: 'Electronic Systems',
        description: 'Electronic components and circuits',
        order: 3,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_019',
        unitId: 'unit_003',
        name: 'Control Systems',
        description: 'Automated control systems and feedback loops',
        order: 4,
        difficulty: 'HARD',
      },
      {
        id: 'topic_020',
        unitId: 'unit_003',
        name: 'Pneumatic and Hydraulic Systems',
        description: 'Fluid power systems and applications',
        order: 5,
        difficulty: 'MEDIUM',
      },
      {
        id: 'topic_021',
        unitId: 'unit_003',
        name: 'Programming and Automation',
        description: 'Basic programming for engineering applications',
        order: 6,
        difficulty: 'HARD',
      },
      {
        id: 'topic_022',
        unitId: 'unit_003',
        name: 'Maintenance and Fault Finding',
        description: 'Troubleshooting and maintaining engineering systems',
        order: 7,
        difficulty: 'MEDIUM',
      },
    ];

    // Create all topics
    await prisma.topic.createMany({
      data: topics,
    });

    // Create sample problems for the first topic
    const sampleProblems = [
      {
        id: 'prob_001_001',
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the SI unit of force?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Newton (N)',
          wrongAnswers: ['Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          explanation: 'The Newton is the SI unit of force, named after Sir Isaac Newton.',
        }),
        tags: 'forces,units,basics',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        id: 'prob_001_002',
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: "Which law states that for every action there is an equal and opposite reaction?",
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: "Newton's Third Law",
          wrongAnswers: ["Newton's First Law", "Newton's Second Law", "Law of Conservation of Energy"],
          explanation: "Newton's Third Law states that forces come in action-reaction pairs.",
        }),
        tags: 'forces,newtons-laws,basics',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        id: 'prob_001_003',
        topicId: 'topic_001',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate the work done when a force of {force}N is applied over a distance of {distance}m',
        variables: JSON.stringify({ force: { min: 10, max: 100 }, distance: { min: 5, max: 20 } }),
        solution: JSON.stringify({
          formula: 'Work = Force × Distance',
          explanation: 'Work is calculated by multiplying force by distance in the direction of force.',
        }),
        tags: 'work,energy,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
    ];

    await prisma.problem.createMany({
      data: sampleProblems,
    });

    const unitCount = await prisma.unit.count();
    const topicCount = await prisma.topic.count();
    const problemCount = await prisma.problem.count();

    return NextResponse.json({
      success: true,
      message: 'All units, topics and sample problems created successfully!',
      unitCount,
      topicCount,
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
