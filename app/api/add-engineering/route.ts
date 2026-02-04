import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Add Engineering units and topics WITHOUT touching existing data
 */
export async function GET() {
  try {
    console.log('Adding Engineering units...');

    // Create Unit 4 - Essential Maths
    let unit4 = await prisma.unit.findFirst({ where: { code: 'UNIT_4' } });
    if (!unit4) {
      unit4 = await prisma.unit.create({
        data: {
          code: 'UNIT_4',
          name: 'Essential Maths',
          description: 'Arithmetic, algebra, geometry, trigonometry, calculus',
          order: 4,
        },
      });
    }

    // Create Unit 5 - Essential Science
    let unit5 = await prisma.unit.findFirst({ where: { code: 'UNIT_5' } });
    if (!unit5) {
      unit5 = await prisma.unit.create({
        data: {
          code: 'UNIT_5',
          name: 'Essential Science',
          description: 'Forces, energy, heat, electrical science, waves',
          order: 5,
        },
      });
    }

    // Create Unit 6 - Materials & Properties
    let unit6 = await prisma.unit.findFirst({ where: { code: 'UNIT_6' } });
    if (!unit6) {
      unit6 = await prisma.unit.create({
        data: {
          code: 'UNIT_6',
          name: 'Materials & Properties',
          description: 'Metals, polymers, ceramics, composites, material properties',
          order: 6,
        },
      });
    }

    // Create Topics for Unit 4
    const unit4Topics = await prisma.topic.count({ where: { unitId: unit4.id } });
    if (unit4Topics === 0) {
      const topics4Data = [
        { name: 'Arithmetic & Algebra', description: 'Basic calculations and algebraic manipulation', order: 1 },
        { name: 'Rearranging Formulae', description: 'Making a variable the subject of a formula', order: 2 },
        { name: 'Ratios & Proportions', description: 'Working with ratios and proportional relationships', order: 3 },
        { name: 'Geometry', description: 'Areas, volumes, angles, and shapes', order: 4 },
        { name: 'Trigonometry', description: 'Sine, cosine, tangent, and their applications', order: 5 },
        { name: 'Logarithms', description: 'Working with logarithmic functions', order: 6 },
        { name: 'Differentiation', description: 'Rates of change and gradients', order: 7 },
        { name: 'Integration', description: 'Areas under curves and accumulation', order: 8 },
      ];

      for (const topic of topics4Data) {
        await prisma.topic.create({
          data: { ...topic, unitId: unit4.id, difficulty: 'INTERMEDIATE' },
        });
      }
    }

    // Create Topics for Unit 5
    const unit5Topics = await prisma.topic.count({ where: { unitId: unit5.id } });
    if (unit5Topics === 0) {
      const topics5Data = [
        { name: 'Forces & Motion', description: 'Newton\'s laws, velocity, acceleration', order: 1 },
        { name: 'Energy & Power', description: 'Work, energy conversions, power calculations', order: 2 },
        { name: 'Heat Transfer', description: 'Conduction, convection, radiation', order: 3 },
        { name: 'Electrical Science', description: 'Current, voltage, resistance, circuits', order: 4 },
        { name: 'Waves & Radiation', description: 'Wave properties, frequency, wavelength', order: 5 },
        { name: 'Chemical Reactions', description: 'Balancing equations, stoichiometry', order: 6 },
      ];

      for (const topic of topics5Data) {
        await prisma.topic.create({
          data: { ...topic, unitId: unit5.id, difficulty: 'INTERMEDIATE' },
        });
      }
    }

    // Create Topics for Unit 6
    const unit6Topics = await prisma.topic.count({ where: { unitId: unit6.id } });
    if (unit6Topics === 0) {
      const topics6Data = [
        { name: 'Metals', description: 'Properties and applications of metallic materials', order: 1 },
        { name: 'Polymers', description: 'Plastics and their characteristics', order: 2 },
        { name: 'Ceramics', description: 'Non-metallic inorganic materials', order: 3 },
        { name: 'Composites', description: 'Combination materials and their benefits', order: 4 },
        { name: 'Mechanical Properties', description: 'Strength, hardness, ductility, toughness', order: 5 },
        { name: 'Thermal Properties', description: 'Thermal expansion, conductivity', order: 6 },
        { name: 'Electrical Properties', description: 'Conductivity and resistivity', order: 7 },
        { name: 'Corrosion', description: 'Material degradation and prevention', order: 8 },
      ];

      for (const topic of topics6Data) {
        await prisma.topic.create({
          data: { ...topic, unitId: unit6.id, difficulty: 'INTERMEDIATE' },
        });
      }
    }

    // Add sample problems for each topic (10 per topic)
    const allTopics = await prisma.topic.findMany({
      where: {
        unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } }
      },
    });

    const problems: any[] = [];

    for (const topic of allTopics) {
      const existingProblems = await prisma.problem.count({
        where: { topicId: topic.id },
      });

      if (existingProblems === 0) {
        // Add 10 sample problems per topic
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
    }

    if (problems.length > 0) {
      await prisma.problem.createMany({ data: problems });
    }

    const finalCounts = {
      totalUnits: await prisma.unit.count(),
      totalTopics: await prisma.topic.count(),
      totalProblems: await prisma.problem.count(),
      engineeringTopics: allTopics.length,
      problemsAdded: problems.length,
    };

    return NextResponse.json({
      success: true,
      message: 'Engineering units added successfully!',
      counts: finalCounts,
      note: 'Engineering curriculum restored. Visit /api/seed-expanded for 580+ engineering questions.',
    });
  } catch (error: any) {
    console.error('Error adding engineering:', error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
