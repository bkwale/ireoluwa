import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Step 1: Delete existing data
    await prisma.problemAttempt.deleteMany({});
    await prisma.progress.deleteMany({});
    await prisma.studySession.deleteMany({});
    await prisma.problem.deleteMany({});
    await prisma.subtopic.deleteMany({});
    await prisma.topic.deleteMany({});
    await prisma.unit.deleteMany({});
    await prisma.user.deleteMany({});

    // Step 2: Create users
    const studentPassword = await bcrypt.hash('student123', 10);
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    await prisma.user.create({
      data: {
        username: 'ireoluwa',
        email: '[email protected]',
        name: 'Ireoluwa',
        passwordHash: studentPassword,
        role: 'STUDENT',
      },
    });

    await prisma.user.create({
      data: {
        username: 'admin',
        email: '[email protected]',
        name: 'Guardian',
        passwordHash: guardianPassword,
        role: 'GUARDIAN',
      },
    });

    // Step 3: Create Units (including English)
    const unit4 = await prisma.unit.create({
      data: {
        code: 'UNIT_4',
        name: 'Essential Maths',
        description: 'Arithmetic, algebra, geometry, trigonometry, calculus',
        order: 4,
      },
    });

    const unit5 = await prisma.unit.create({
      data: {
        code: 'UNIT_5',
        name: 'Essential Science',
        description: 'Forces, energy, heat, electrical science, waves',
        order: 5,
      },
    });

    const unit6 = await prisma.unit.create({
      data: {
        code: 'UNIT_6',
        name: 'Materials & Properties',
        description: 'Metals, polymers, ceramics, composites, material properties',
        order: 6,
      },
    });

    const unit7 = await prisma.unit.create({
      data: {
        code: 'UNIT_7',
        name: 'English Language',
        description: 'Reading comprehension, grammar, vocabulary, writing techniques, spelling',
        order: 7,
      },
    });

    // Step 4: Create Topics for Unit 4
    const topics4 = [
      { name: 'Arithmetic & Algebra', description: 'Basic calculations and algebraic manipulation', order: 1 },
      { name: 'Rearranging Formulae', description: 'Making a variable the subject of a formula', order: 2 },
      { name: 'Ratios & Proportions', description: 'Working with ratios and proportional relationships', order: 3 },
      { name: 'Geometry', description: 'Areas, volumes, angles, and shapes', order: 4 },
      { name: 'Trigonometry', description: 'Sine, cosine, tangent, and their applications', order: 5 },
      { name: 'Logarithms', description: 'Working with logarithmic functions', order: 6 },
      { name: 'Differentiation', description: 'Rates of change and gradients', order: 7 },
      { name: 'Integration', description: 'Areas under curves and accumulation', order: 8 },
    ];

    for (const topic of topics4) {
      await prisma.topic.create({
        data: {
          ...topic,
          unitId: unit4.id,
          difficulty: 'INTERMEDIATE',
        },
      });
    }

    // Step 5: Create Topics for Unit 5
    const topics5 = [
      { name: 'Forces & Motion', description: 'Newton\'s laws, velocity, acceleration', order: 1 },
      { name: 'Energy & Power', description: 'Work, energy conversions, power calculations', order: 2 },
      { name: 'Heat Transfer', description: 'Conduction, convection, radiation', order: 3 },
      { name: 'Electrical Science', description: 'Current, voltage, resistance, circuits', order: 4 },
      { name: 'Waves & Radiation', description: 'Wave properties, frequency, wavelength', order: 5 },
      { name: 'Chemical Reactions', description: 'Balancing equations, stoichiometry', order: 6 },
    ];

    for (const topic of topics5) {
      await prisma.topic.create({
        data: {
          ...topic,
          unitId: unit5.id,
          difficulty: 'INTERMEDIATE',
        },
      });
    }

    // Step 6: Create Topics for Unit 6
    const topics6 = [
      { name: 'Metals', description: 'Properties and applications of metallic materials', order: 1 },
      { name: 'Polymers', description: 'Plastics and their characteristics', order: 2 },
      { name: 'Ceramics', description: 'Non-metallic inorganic materials', order: 3 },
      { name: 'Composites', description: 'Combination materials and their benefits', order: 4 },
      { name: 'Mechanical Properties', description: 'Strength, hardness, ductility, toughness', order: 5 },
      { name: 'Thermal Properties', description: 'Thermal expansion, conductivity', order: 6 },
      { name: 'Electrical Properties', description: 'Conductivity and resistivity', order: 7 },
      { name: 'Corrosion', description: 'Material degradation and prevention', order: 8 },
    ];

    for (const topic of topics6) {
      await prisma.topic.create({
        data: {
          ...topic,
          unitId: unit6.id,
          difficulty: 'INTERMEDIATE',
        },
      });
    }

    // Step 7: Create Topics for Unit 7 - English Language
    const topics7 = [
      { name: 'Reading Comprehension', description: 'Understanding texts, identifying main ideas and inferences', order: 1 },
      { name: 'Grammar & Punctuation', description: 'Sentence structure, verb tenses, punctuation rules', order: 2 },
      { name: 'Vocabulary', description: 'Word meanings, synonyms, antonyms, context clues', order: 3 },
      { name: 'Writing Techniques', description: 'Persuasive writing, literary devices, tone and style', order: 4 },
      { name: 'Spelling', description: 'Common spelling rules, homophones, frequently misspelled words', order: 5 },
      { name: 'Sentence Construction', description: 'Building effective sentences, avoiding fragments and run-ons', order: 6 },
    ];

    for (const topic of topics7) {
      await prisma.topic.create({
        data: {
          ...topic,
          unitId: unit7.id,
          difficulty: 'INTERMEDIATE',
        },
      });
    }

    const unitCount = await prisma.unit.count();
    const topicCount = await prisma.topic.count();

    return NextResponse.json({
      success: true,
      message: 'Database structure created with English unit!',
      counts: {
        units: unitCount,
        topics: topicCount,
      },
      note: 'Next step: Call /api/seed-expanded for engineering questions, then /api/seed-english for English questions',
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
