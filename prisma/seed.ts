import bcrypt from 'bcryptjs';
import { prisma } from '../lib/db';

async function main() {
  console.log('Seeding database...');

  // Create users
  const studentPassword = await bcrypt.hash('student123', 10);
  const guardianPassword = await bcrypt.hash('guardian123', 10);

  const student = await prisma.user.upsert({
    where: { username: 'ireoluwa' },
    update: {},
    create: {
      username: 'ireoluwa',
      email: '[email protected]',
      name: 'Ireoluwa',
      passwordHash: studentPassword,
      role: 'STUDENT',
    },
  });

  const guardian = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: '[email protected]',
      name: 'Guardian',
      passwordHash: guardianPassword,
      role: 'GUARDIAN',
    },
  });

  console.log('Created users:', { student: student.username, guardian: guardian.username });

  // Create Units
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

  console.log('Created units');

  // Create Topics for Unit 4
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

  // Create Topics for Unit 5
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

  // Create Topics for Unit 6
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

  // Create Topics for Unit 7 - English Language
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

  console.log('Created all topics');

  // Create sample problems for Unit 4 - Trigonometry
  const trigTopic = await prisma.topic.findFirst({
    where: { name: 'Trigonometry' },
  });

  if (trigTopic) {
    await prisma.problem.create({
      data: {
        topicId: trigTopic.id,
        type: 'NUMERIC',
        difficulty: 'FOUNDATION',
        template: JSON.stringify({
          question: 'A right-angled triangle has an angle of {angle}° and a hypotenuse of {hypotenuse}m. Calculate the length of the opposite side. Give your answer to 2 decimal places.',
          variables: { angle: 'number', hypotenuse: 'number' },
        }),
        variables: JSON.stringify({
          angle: { min: 20, max: 70, step: 5 },
          hypotenuse: { min: 5, max: 20, step: 1 },
        }),
        solution: JSON.stringify({
          formula: 'sin(θ) = opposite/hypotenuse',
          steps: [
            'Identify the given values',
            'Write the sine formula',
            'Rearrange to find opposite side',
            'Calculate the result',
          ],
          answer: 'sin({angle}) × {hypotenuse}',
        }),
        tags: 'trigonometry,sine,right-triangle',
        estimatedTime: 5,
        requiresDiagram: true,
        diagramType: 'right-triangle',
      },
    });

    await prisma.problem.create({
      data: {
        topicId: trigTopic.id,
        type: 'NUMERIC',
        difficulty: 'INTERMEDIATE',
        template: JSON.stringify({
          question: 'In triangle ABC, angle A = {angleA}°, side a = {sideA}cm, and side b = {sideB}cm. Use the sine rule to find angle B. Give your answer to 1 decimal place.',
          variables: { angleA: 'number', sideA: 'number', sideB: 'number' },
        }),
        variables: JSON.stringify({
          angleA: { min: 30, max: 80, step: 10 },
          sideA: { min: 8, max: 15, step: 1 },
          sideB: { min: 5, max: 12, step: 1 },
        }),
        solution: JSON.stringify({
          formula: 'a/sin(A) = b/sin(B)',
          steps: [
            'Write the sine rule',
            'Substitute known values',
            'Rearrange to find sin(B)',
            'Use inverse sine to find angle B',
          ],
          answer: 'arcsin(({sideB} × sin({angleA})) / {sideA})',
        }),
        tags: 'trigonometry,sine-rule,triangles',
        estimatedTime: 8,
        requiresDiagram: true,
        diagramType: 'triangle',
      },
    });
  }

  // Create sample problems for Unit 5 - Forces & Motion
  const forcesTopic = await prisma.topic.findFirst({
    where: { name: 'Forces & Motion' },
  });

  if (forcesTopic) {
    await prisma.problem.create({
      data: {
        topicId: forcesTopic.id,
        type: 'NUMERIC',
        difficulty: 'FOUNDATION',
        template: JSON.stringify({
          question: 'A car accelerates from rest to {velocity}m/s in {time}s. Calculate the acceleration.',
          variables: { velocity: 'number', time: 'number' },
        }),
        variables: JSON.stringify({
          velocity: { min: 10, max: 30, step: 5 },
          time: { min: 4, max: 12, step: 2 },
        }),
        solution: JSON.stringify({
          formula: 'a = (v - u) / t',
          steps: [
            'Identify: u = 0 (starts from rest), v = {velocity}m/s, t = {time}s',
            'Use equation: a = (v - u) / t',
            'Substitute values',
            'Calculate acceleration',
          ],
          answer: '{velocity} / {time}',
        }),
        tags: 'forces,motion,acceleration,kinematics',
        estimatedTime: 5,
        requiresDiagram: false,
      },
    });

    await prisma.problem.create({
      data: {
        topicId: forcesTopic.id,
        type: 'NUMERIC',
        difficulty: 'INTERMEDIATE',
        template: JSON.stringify({
          question: 'A force of {force}N is applied to a mass of {mass}kg on a frictionless surface. Calculate the acceleration produced.',
          variables: { force: 'number', mass: 'number' },
        }),
        variables: JSON.stringify({
          force: { min: 20, max: 100, step: 10 },
          mass: { min: 2, max: 20, step: 2 },
        }),
        solution: JSON.stringify({
          formula: 'F = ma',
          steps: [
            'Identify given values: F = {force}N, m = {mass}kg',
            'Use Newton\'s second law: F = ma',
            'Rearrange: a = F/m',
            'Calculate acceleration',
          ],
          answer: '{force} / {mass}',
        }),
        tags: 'forces,newtons-laws,acceleration',
        estimatedTime: 6,
        requiresDiagram: true,
        diagramType: 'force-diagram',
      },
    });
  }

  // Create sample problems for Unit 6 - Mechanical Properties
  const mechPropTopic = await prisma.topic.findFirst({
    where: { name: 'Mechanical Properties' },
  });

  if (mechPropTopic) {
    await prisma.problem.create({
      data: {
        topicId: mechPropTopic.id,
        type: 'NUMERIC',
        difficulty: 'FOUNDATION',
        template: JSON.stringify({
          question: 'A wire of cross-sectional area {area}mm² experiences a tensile force of {force}N. Calculate the stress in the wire. Give your answer in MPa.',
          variables: { area: 'number', force: 'number' },
        }),
        variables: JSON.stringify({
          area: { min: 2, max: 10, step: 1 },
          force: { min: 100, max: 1000, step: 100 },
        }),
        solution: JSON.stringify({
          formula: 'Stress = Force / Area',
          steps: [
            'Convert area to m²: {area}mm² = {area} × 10⁻⁶ m²',
            'Use formula: Stress = Force / Area',
            'Calculate: Stress = {force} / ({area} × 10⁻⁶)',
            'Convert to MPa (÷ 10⁶)',
          ],
          answer: '{force} / {area}',
        }),
        tags: 'materials,stress,mechanical-properties',
        estimatedTime: 7,
        requiresDiagram: false,
      },
    });
  }

  console.log('Created sample problems');
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
