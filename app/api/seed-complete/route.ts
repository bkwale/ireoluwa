import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Delete all existing data
    await prisma.problem.deleteMany({});
    await prisma.topic.deleteMany({});
    await prisma.unit.deleteMany({});

    // Create Units for different subjects
    const units = [
      // Engineering
      {
        id: 'unit_eng_001',
        code: 'ENG1',
        name: 'Engineering Principles',
        description: 'Core engineering principles and fundamentals',
        order: 1,
      },
      {
        id: 'unit_eng_002',
        code: 'ENG2',
        name: 'Engineering Design',
        description: 'Design processes and technical drawing',
        order: 2,
      },
      {
        id: 'unit_eng_003',
        code: 'ENG3',
        name: 'Engineering Systems',
        description: 'Mechanical, electrical and control systems',
        order: 3,
      },
      // Health & Social Care
      {
        id: 'unit_hsc_001',
        code: 'HSC1',
        name: 'Health & Social Care Principles',
        description: 'Core principles and values in health and social care',
        order: 4,
      },
      {
        id: 'unit_hsc_002',
        code: 'HSC2',
        name: 'Health & Wellbeing',
        description: 'Promoting health and wellbeing',
        order: 5,
      },
      // Digital Production, Design & Development
      {
        id: 'unit_dig_001',
        code: 'DIG1',
        name: 'Digital Development',
        description: 'Software development and programming',
        order: 6,
      },
      {
        id: 'unit_dig_002',
        code: 'DIG2',
        name: 'Digital Design',
        description: 'Digital design principles and tools',
        order: 7,
      },
      // Education & Childcare
      {
        id: 'unit_edu_001',
        code: 'EDU1',
        name: 'Child Development',
        description: 'Understanding child development stages',
        order: 8,
      },
      {
        id: 'unit_edu_002',
        code: 'EDU2',
        name: 'Education Practice',
        description: 'Educational approaches and safeguarding',
        order: 9,
      },
    ];

    await prisma.unit.createMany({ data: units });

    // Create Topics
    const topics = [
      // Engineering Topics
      { id: 'topic_001', unitId: 'unit_eng_001', name: 'Forces and Motion', description: 'Fundamental principles of forces, motion, and energy', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_002', unitId: 'unit_eng_001', name: 'Materials and Properties', description: 'Properties and processing of engineering materials', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_003', unitId: 'unit_eng_001', name: 'Engineering Mathematics', description: 'Mathematical concepts and calculations for engineering', order: 3, difficulty: 'HARD' },
      { id: 'topic_004', unitId: 'unit_eng_001', name: 'Statics and Dynamics', description: 'Forces, moments, and motion analysis', order: 4, difficulty: 'HARD' },
      { id: 'topic_005', unitId: 'unit_eng_001', name: 'Thermodynamics', description: 'Heat, temperature, and energy transfer', order: 5, difficulty: 'MEDIUM' },
      { id: 'topic_006', unitId: 'unit_eng_001', name: 'Fluid Mechanics', description: 'Properties and behavior of fluids', order: 6, difficulty: 'MEDIUM' },
      { id: 'topic_007', unitId: 'unit_eng_001', name: 'Health and Safety', description: 'Engineering health and safety regulations', order: 7, difficulty: 'EASY' },
      { id: 'topic_008', unitId: 'unit_eng_002', name: 'Technical Drawing', description: 'Reading and creating engineering drawings', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_009', unitId: 'unit_eng_002', name: 'CAD and Design', description: 'Computer-aided design principles', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_010', unitId: 'unit_eng_002', name: 'Manufacturing Processes', description: 'Common manufacturing and fabrication techniques', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_011', unitId: 'unit_eng_002', name: 'Quality Control', description: 'Quality assurance and control in engineering', order: 4, difficulty: 'MEDIUM' },
      { id: 'topic_012', unitId: 'unit_eng_002', name: 'Testing and Measurement', description: 'Measurement techniques and testing procedures', order: 5, difficulty: 'MEDIUM' },
      { id: 'topic_013', unitId: 'unit_eng_002', name: 'Welding and Joining', description: 'Methods of joining materials', order: 6, difficulty: 'MEDIUM' },
      { id: 'topic_014', unitId: 'unit_eng_002', name: 'Sustainable Engineering', description: 'Environmental considerations and sustainability', order: 7, difficulty: 'EASY' },
      { id: 'topic_015', unitId: 'unit_eng_002', name: 'Project Management', description: 'Planning and managing engineering projects', order: 8, difficulty: 'EASY' },
      { id: 'topic_016', unitId: 'unit_eng_003', name: 'Mechanical Systems', description: 'Mechanical components and systems', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_017', unitId: 'unit_eng_003', name: 'Electrical Systems', description: 'Basic electrical circuits and components', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_018', unitId: 'unit_eng_003', name: 'Electronic Systems', description: 'Electronic components and circuits', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_019', unitId: 'unit_eng_003', name: 'Control Systems', description: 'Automated control systems and feedback loops', order: 4, difficulty: 'HARD' },
      { id: 'topic_020', unitId: 'unit_eng_003', name: 'Pneumatic and Hydraulic Systems', description: 'Fluid power systems and applications', order: 5, difficulty: 'MEDIUM' },
      { id: 'topic_021', unitId: 'unit_eng_003', name: 'Programming and Automation', description: 'Basic programming for engineering applications', order: 6, difficulty: 'HARD' },
      { id: 'topic_022', unitId: 'unit_eng_003', name: 'Maintenance and Fault Finding', description: 'Troubleshooting and maintaining engineering systems', order: 7, difficulty: 'MEDIUM' },

      // Health & Social Care Topics
      { id: 'topic_101', unitId: 'unit_hsc_001', name: 'Care Values and Principles', description: 'Core values in health and social care', order: 1, difficulty: 'EASY' },
      { id: 'topic_102', unitId: 'unit_hsc_001', name: 'Communication in Care', description: 'Effective communication with service users', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_103', unitId: 'unit_hsc_001', name: 'Safeguarding', description: 'Protecting vulnerable individuals', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_104', unitId: 'unit_hsc_002', name: 'Health and Wellbeing', description: 'Factors affecting health and wellbeing', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_105', unitId: 'unit_hsc_002', name: 'Person-Centred Care', description: 'Individualized care approaches', order: 2, difficulty: 'MEDIUM' },

      // Digital Topics
      { id: 'topic_201', unitId: 'unit_dig_001', name: 'Programming Fundamentals', description: 'Basic programming concepts and structures', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_202', unitId: 'unit_dig_001', name: 'Data Structures', description: 'Arrays, lists, and data organization', order: 2, difficulty: 'HARD' },
      { id: 'topic_203', unitId: 'unit_dig_001', name: 'Web Development', description: 'HTML, CSS, and JavaScript basics', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_204', unitId: 'unit_dig_002', name: 'UI/UX Design', description: 'User interface and experience design', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_205', unitId: 'unit_dig_002', name: 'Databases', description: 'Database design and SQL', order: 2, difficulty: 'HARD' },

      // Education & Childcare Topics
      { id: 'topic_301', unitId: 'unit_edu_001', name: 'Child Development Stages', description: 'Physical, cognitive, and emotional development', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_302', unitId: 'unit_edu_001', name: 'Play and Learning', description: 'Learning through play approaches', order: 2, difficulty: 'EASY' },
      { id: 'topic_303', unitId: 'unit_edu_002', name: 'Safeguarding Children', description: 'Child protection and safeguarding', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_304', unitId: 'unit_edu_002', name: 'Inclusive Practice', description: 'Supporting all children', order: 2, difficulty: 'MEDIUM' },
    ];

    await prisma.topic.createMany({ data: topics });

    // Create comprehensive problems
    const problems: any[] = [];

    // Engineering problems (detailed)
    const engineeringProblems = [
      // Forces and Motion
      {
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the SI unit of force?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Newton (N)',
          wrongAnswers: ['Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          explanation: 'The Newton (N) is the SI unit of force. It is named after Sir Isaac Newton.',
        }),
        tags: 'forces,units',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: "Which of Newton's laws states: For every action, there is an equal and opposite reaction?",
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: "Newton's Third Law",
          wrongAnswers: ["Newton's First Law", "Newton's Second Law", "Law of Universal Gravitation"],
          explanation: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force.",
        }),
        tags: 'forces,newtons-laws',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_001',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'A car of mass 1000kg accelerates from rest to 20m/s in 10 seconds. What is the net force acting on the car?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2000 N',
          wrongAnswers: ['1000 N', '20000 N', '200 N'],
          explanation: 'Using F = ma, first find acceleration: a = (20-0)/10 = 2 m/s². Then F = 1000 × 2 = 2000 N.',
        }),
        tags: 'forces,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },

      // Materials and Properties
      {
        topicId: 'topic_002',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: "Which material property describes a material's ability to be drawn into wires?",
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Ductility',
          wrongAnswers: ['Malleability', 'Hardness', 'Brittleness'],
          explanation: 'Ductility is the ability of a material to be drawn into wires without breaking.',
        }),
        tags: 'materials,properties',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_002',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What type of stress occurs when a material is subjected to pulling forces?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Tensile stress',
          wrongAnswers: ['Compressive stress', 'Shear stress', 'Torsional stress'],
          explanation: 'Tensile stress occurs when forces pull on a material, trying to stretch it.',
        }),
        tags: 'materials,stress',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_002',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Which heat treatment process involves heating steel above its critical temperature and then cooling it rapidly?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Quenching',
          wrongAnswers: ['Annealing', 'Tempering', 'Normalizing'],
          explanation: 'Quenching involves rapid cooling to increase hardness and strength of steel.',
        }),
        tags: 'materials,heat-treatment',
        estimatedTime: 120,
        examRelevance: true,
      },

      // Engineering Mathematics
      {
        topicId: 'topic_003',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the formula for the area of a circle?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'πr²',
          wrongAnswers: ['2πr', 'πd', 'πr'],
          explanation: 'The area of a circle is π multiplied by the radius squared (A = πr²).',
        }),
        tags: 'math,geometry',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_003',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the gradient of a straight line passing through points (2,3) and (6,11)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2',
          wrongAnswers: ['0.5', '4', '8'],
          explanation: 'Gradient = (y₂-y₁)/(x₂-x₁) = (11-3)/(6-2) = 8/4 = 2.',
        }),
        tags: 'math,algebra',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_003',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Solve for x: 3x² - 12 = 0',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x = ±2',
          wrongAnswers: ['x = ±4', 'x = 2', 'x = 4'],
          explanation: '3x² = 12, x² = 4, therefore x = ±2.',
        }),
        tags: 'math,quadratics',
        estimatedTime: 120,
        examRelevance: true,
      },
    ];

    problems.push(...engineeringProblems);

    // Add basic problems for other engineering topics
    const remainingEngTopics = topics.filter(t => t.id.startsWith('topic_0') && !['topic_001', 'topic_002', 'topic_003'].includes(t.id));
    for (const topic of remainingEngTopics) {
      problems.push(
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: `What is a key principle of ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Understanding fundamental concepts',
            wrongAnswers: ['Ignoring safety procedures', 'Skipping planning stages', 'Avoiding calculations'],
            explanation: `${topic.name} requires understanding of fundamental engineering principles.`,
          }),
          tags: 'basics',
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: `Which tool or method is commonly used in ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Industry-standard practices',
            wrongAnswers: ['Random guessing', 'Unreliable methods', 'Outdated techniques'],
            explanation: `${topic.name} relies on proven industry-standard practices and methods.`,
          }),
          tags: 'intermediate',
          estimatedTime: 90,
          examRelevance: true,
        },
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'HARD',
          template: `What advanced concept applies to ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Systems thinking and analysis',
            wrongAnswers: ['Ignoring variables', 'Single-factor analysis', 'Isolated thinking'],
            explanation: `Advanced ${topic.name} requires systems thinking to understand interconnections.`,
          }),
          tags: 'advanced',
          estimatedTime: 120,
          examRelevance: true,
        }
      );
    }

    // Health & Social Care problems
    const hscProblems = [
      {
        topicId: 'topic_101',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which of the following is a core value in health and social care?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Dignity and respect',
          wrongAnswers: ['Cost reduction', 'Speed of service', 'Standardization'],
          explanation: 'Dignity and respect are fundamental values in health and social care.',
        }),
        tags: 'care-values,principles',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_102',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the most important factor when communicating with a service user with hearing impairment?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Face the person and speak clearly',
          wrongAnswers: ['Speak louder', 'Use complex vocabulary', 'Rush through the conversation'],
          explanation: 'Facing the person allows them to read lips and see facial expressions.',
        }),
        tags: 'communication,accessibility',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_103',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'In safeguarding, what does the term "whistleblowing" refer to?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Reporting concerns about poor practice or abuse',
          wrongAnswers: ['Training new staff', 'Conducting health and safety checks', 'Organizing team meetings'],
          explanation: 'Whistleblowing is the act of reporting malpractice or wrongdoing within an organization.',
        }),
        tags: 'safeguarding,professional-practice',
        estimatedTime: 120,
        examRelevance: true,
      },
    ];

    problems.push(...hscProblems);

    // Add basic problems for other HSC topics
    const remainingHscTopics = topics.filter(t => t.id.startsWith('topic_1') && !['topic_101', 'topic_102', 'topic_103'].includes(t.id));
    for (const topic of remainingHscTopics) {
      problems.push(
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: `What is essential in ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Person-centred approach',
            wrongAnswers: ['One-size-fits-all methods', 'Ignoring individual needs', 'Task-focused care'],
            explanation: `${topic.name} requires a person-centred approach that respects individual needs.`,
          }),
          tags: 'care-practice',
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: `Which legislation is relevant to ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Health and Social Care Act',
            wrongAnswers: ['Traffic Regulations', 'Building Codes', 'Copyright Law'],
            explanation: `The Health and Social Care Act provides the legal framework for ${topic.name}.`,
          }),
          tags: 'legislation',
          estimatedTime: 90,
          examRelevance: true,
        }
      );
    }

    // Digital Production problems
    const digitalProblems = [
      {
        topicId: 'topic_201',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which of the following is a programming loop structure?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'for loop',
          wrongAnswers: ['function', 'variable', 'comment'],
          explanation: 'A for loop is a control structure that repeats a block of code a specific number of times.',
        }),
        tags: 'programming,loops',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_202',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which data structure follows the Last In First Out (LIFO) principle?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Stack',
          wrongAnswers: ['Queue', 'Array', 'Tree'],
          explanation: 'A stack follows LIFO where the last element added is the first one removed.',
        }),
        tags: 'data-structures',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_203',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which HTML tag is used to create a hyperlink?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '<a>',
          wrongAnswers: ['<link>', '<href>', '<url>'],
          explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML.',
        }),
        tags: 'web-development,html',
        estimatedTime: 60,
        examRelevance: true,
      },
    ];

    problems.push(...digitalProblems);

    // Add basic problems for other digital topics
    const remainingDigitalTopics = topics.filter(t => t.id.startsWith('topic_2') && !['topic_201', 'topic_202', 'topic_203'].includes(t.id));
    for (const topic of remainingDigitalTopics) {
      problems.push(
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: `What is important in ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'User experience and functionality',
            wrongAnswers: ['Complexity', 'Technical jargon', 'Ignoring user feedback'],
            explanation: `${topic.name} focuses on creating solutions that are both functional and user-friendly.`,
          }),
          tags: 'digital-practice',
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: `Which principle applies to ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Best practices and standards',
            wrongAnswers: ['Random implementation', 'Outdated methods', 'Ignoring accessibility'],
            explanation: `${topic.name} requires following industry best practices and standards.`,
          }),
          tags: 'standards',
          estimatedTime: 90,
          examRelevance: true,
        }
      );
    }

    // Education & Childcare problems
    const educationProblems = [
      {
        topicId: 'topic_301',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'At what age do most children typically start walking independently?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '12-15 months',
          wrongAnswers: ['6-9 months', '18-24 months', '3-4 years'],
          explanation: 'Most children begin walking independently between 12-15 months of age.',
        }),
        tags: 'development,milestones',
        estimatedTime: 60,
        examRelevance: true,
      },
      {
        topicId: 'topic_302',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which type of play involves children playing alongside each other but not together?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Parallel play',
          wrongAnswers: ['Cooperative play', 'Solitary play', 'Social play'],
          explanation: 'Parallel play occurs when children play side by side with similar toys but without interaction.',
        }),
        tags: 'play,social-development',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_303',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'What is the main purpose of the DBS (Disclosure and Barring Service) check?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'To check if individuals are suitable to work with children',
          wrongAnswers: ['To verify qualifications', 'To check work experience', 'To assess teaching skills'],
          explanation: 'DBS checks help prevent unsuitable people from working with vulnerable groups including children.',
        }),
        tags: 'safeguarding,legislation',
        estimatedTime: 120,
        examRelevance: true,
      },
    ];

    problems.push(...educationProblems);

    // Add basic problems for other education topics
    const remainingEducationTopics = topics.filter(t => t.id.startsWith('topic_3') && !['topic_301', 'topic_302', 'topic_303'].includes(t.id));
    for (const topic of remainingEducationTopics) {
      problems.push(
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: `What is key to ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Child-centred approach',
            wrongAnswers: ['Adult-led activities only', 'Ignoring individual needs', 'Standardized methods'],
            explanation: `${topic.name} requires putting children's needs and interests at the center of practice.`,
          }),
          tags: 'childcare-practice',
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId: topic.id,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: `Which framework guides ${topic.name}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'EYFS (Early Years Foundation Stage)',
            wrongAnswers: ['National Curriculum only', 'No specific framework', 'Adult education standards'],
            explanation: `The EYFS provides the statutory framework for ${topic.name} in England.`,
          }),
          tags: 'frameworks',
          estimatedTime: 90,
          examRelevance: true,
        }
      );
    }

    await prisma.problem.createMany({ data: problems });

    const unitCount = await prisma.unit.count();
    const topicCount = await prisma.topic.count();
    const problemCount = await prisma.problem.count();

    return NextResponse.json({
      success: true,
      message: 'Complete database seeded with all subjects!',
      unitCount,
      topicCount,
      problemCount,
      subjects: ['Engineering', 'Health & Social Care', 'Digital Production', 'Education & Childcare'],
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
