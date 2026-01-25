import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Check if topics already exist
    const existingTopics = await prisma.topic.count();

    if (existingTopics > 0) {
      return NextResponse.json({
        message: 'Topics already seeded',
        count: existingTopics,
      });
    }

    // All 22 T-Level Engineering topics
    const topics = [
      {
        id: 'topic_001',
        title: 'Engineering Principles',
        description: 'Fundamental principles of engineering including forces, motion, and energy',
        order: 1,
      },
      {
        id: 'topic_002',
        title: 'Materials and Processing',
        description: 'Properties and processing of engineering materials',
        order: 2,
      },
      {
        id: 'topic_003',
        title: 'Manufacturing Processes',
        description: 'Common manufacturing and fabrication techniques',
        order: 3,
      },
      {
        id: 'topic_004',
        title: 'Mechanical Systems',
        description: 'Understanding mechanical components and systems',
        order: 4,
      },
      {
        id: 'topic_005',
        title: 'Electrical and Electronic Systems',
        description: 'Basic electrical circuits and electronic components',
        order: 5,
      },
      {
        id: 'topic_006',
        title: 'Engineering Mathematics',
        description: 'Mathematical concepts and calculations for engineering',
        order: 6,
      },
      {
        id: 'topic_007',
        title: 'Technical Drawing',
        description: 'Reading and creating engineering drawings',
        order: 7,
      },
      {
        id: 'topic_008',
        title: 'CAD and Design',
        description: 'Computer-aided design principles and practices',
        order: 8,
      },
      {
        id: 'topic_009',
        title: 'Health and Safety',
        description: 'Engineering health and safety regulations and practices',
        order: 9,
      },
      {
        id: 'topic_010',
        title: 'Quality Control',
        description: 'Quality assurance and control in engineering',
        order: 10,
      },
      {
        id: 'topic_011',
        title: 'Thermodynamics',
        description: 'Heat, temperature, and energy transfer',
        order: 11,
      },
      {
        id: 'topic_012',
        title: 'Fluid Mechanics',
        description: 'Properties and behavior of fluids',
        order: 12,
      },
      {
        id: 'topic_013',
        title: 'Statics and Dynamics',
        description: 'Forces, moments, and motion analysis',
        order: 13,
      },
      {
        id: 'topic_014',
        title: 'Control Systems',
        description: 'Automated control systems and feedback loops',
        order: 14,
      },
      {
        id: 'topic_015',
        title: 'Programming and Automation',
        description: 'Basic programming for engineering applications',
        order: 15,
      },
      {
        id: 'topic_016',
        title: 'Project Management',
        description: 'Planning and managing engineering projects',
        order: 16,
      },
      {
        id: 'topic_017',
        title: 'Sustainable Engineering',
        description: 'Environmental considerations and sustainability',
        order: 17,
      },
      {
        id: 'topic_018',
        title: 'Testing and Measurement',
        description: 'Measurement techniques and testing procedures',
        order: 18,
      },
      {
        id: 'topic_019',
        title: 'Maintenance and Fault Finding',
        description: 'Troubleshooting and maintaining engineering systems',
        order: 19,
      },
      {
        id: 'topic_020',
        title: 'Pneumatic and Hydraulic Systems',
        description: 'Fluid power systems and applications',
        order: 20,
      },
      {
        id: 'topic_021',
        title: 'Welding and Joining',
        description: 'Methods of joining materials and components',
        order: 21,
      },
      {
        id: 'topic_022',
        title: 'Engineering Communication',
        description: 'Technical communication and documentation',
        order: 22,
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
        question: 'What is the SI unit of force?',
        correctAnswer: 'Newton (N)',
        wrongAnswers: ['Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
        explanation: 'The Newton is the SI unit of force, named after Sir Isaac Newton. One Newton is the force required to accelerate a mass of one kilogram at a rate of one meter per second squared.',
        difficulty: 'EASY',
        order: 1,
      },
      {
        id: 'prob_001_002',
        topicId: 'topic_001',
        question: 'Which law states that for every action there is an equal and opposite reaction?',
        correctAnswer: "Newton's Third Law",
        wrongAnswers: ["Newton's First Law", "Newton's Second Law", "Law of Conservation of Energy"],
        explanation: "Newton's Third Law states that when one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body.",
        difficulty: 'EASY',
        order: 2,
      },
      {
        id: 'prob_001_003',
        topicId: 'topic_001',
        question: 'What is the formula for calculating work done?',
        correctAnswer: 'Work = Force × Distance',
        wrongAnswers: ['Work = Mass × Acceleration', 'Work = Power × Time', 'Work = Force × Time'],
        explanation: 'Work is calculated by multiplying the force applied by the distance moved in the direction of the force. The SI unit of work is the Joule (J).',
        difficulty: 'MEDIUM',
        order: 3,
      },
    ];

    await prisma.problem.createMany({
      data: sampleProblems,
    });

    const topicCount = await prisma.topic.count();
    const problemCount = await prisma.problem.count();

    return NextResponse.json({
      success: true,
      message: 'All topics and sample problems created successfully!',
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
