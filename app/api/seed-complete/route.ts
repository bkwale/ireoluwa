import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Delete all existing data in correct order (respecting foreign keys)
    await prisma.problemAttempt.deleteMany({});
    await prisma.progress.deleteMany({});
    await prisma.problem.deleteMany({});
    await prisma.topic.deleteMany({});
    await prisma.unit.deleteMany({});

    // Create the 15 T-Level Engineering Units
    const units = [
      { id: 'unit_001', code: 'UNIT1', name: 'Working Within Engineering', description: 'Manufacturing processes, maintenance, automation and CAD/CAM systems', order: 1 },
      { id: 'unit_002', code: 'UNIT2', name: 'Engineering Past, Present and Future', description: 'Historical developments, industrial revolutions and innovation', order: 2 },
      { id: 'unit_003', code: 'UNIT3', name: 'Engineering Representation', description: 'Technical drawing, sketching, orthographic projection and CAD', order: 3 },
      { id: 'unit_004', code: 'UNIT4', name: 'Essential Maths', description: 'Algebra, geometry, trigonometry, calculus and logarithms', order: 4 },
      { id: 'unit_005', code: 'UNIT5', name: 'Essential Science', description: 'Forces, energy, heat, electricity, waves and chemistry', order: 5 },
      { id: 'unit_006', code: 'UNIT6', name: 'Materials and Properties', description: 'Metals, polymers, ceramics, composites and material properties', order: 6 },
      { id: 'unit_007', code: 'UNIT7', name: 'Mechanical Principles', description: 'Forces, stress, machines, power transmission and hydraulics', order: 7 },
      { id: 'unit_008', code: 'UNIT8', name: 'Electrical and Electronic Principles', description: 'DC/AC circuits, components, sensors and electrical safety', order: 8 },
      { id: 'unit_009', code: 'UNIT9', name: 'Mechatronics', description: 'Integrated systems, sensors, control and automation', order: 9 },
      { id: 'unit_010', code: 'UNIT10', name: 'Engineering and Manufacturing Control Systems', description: 'Open/closed-loop systems, PLCs and industrial automation', order: 10 },
      { id: 'unit_011', code: 'UNIT11', name: 'Quality Management', description: 'Quality planning, control tools, continuous improvement and standards', order: 11 },
      { id: 'unit_012', code: 'UNIT12', name: 'Health and Safety Principles', description: 'Legislation, risk assessment, COSHH, PPE and environmental protection', order: 12 },
      { id: 'unit_013', code: 'UNIT13', name: 'Commercial and Financial Awareness', description: 'Business structures, costs, supply chains and procurement', order: 13 },
      { id: 'unit_014', code: 'UNIT14', name: 'Professional Responsibilities', description: 'Ethics, teamwork, communication, diversity and lifelong learning', order: 14 },
      { id: 'unit_015', code: 'UNIT15', name: 'Project and Programme Management', description: 'Project planning, scheduling, risk management and resource allocation', order: 15 },
    ];

    await prisma.unit.createMany({ data: units });

    // Create Topics for each unit
    const topics = [
      // Unit 1: Working Within Engineering
      { id: 'topic_001', unitId: 'unit_001', name: 'Manufacturing Processes', description: 'Types and applications of manufacturing processes', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_002', unitId: 'unit_001', name: 'Design Brief and Project Design Specification', description: 'Creating design briefs and specifications', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_003', unitId: 'unit_001', name: 'Installation and Commissioning', description: 'Installing and commissioning engineering systems', order: 3, difficulty: 'HARD' },
      { id: 'topic_004', unitId: 'unit_001', name: 'Types of Maintenance', description: 'Preventive, corrective and predictive maintenance', order: 4, difficulty: 'MEDIUM' },
      { id: 'topic_005', unitId: 'unit_001', name: 'Maintenance Operations and Roles', description: 'Maintenance team roles and responsibilities', order: 5, difficulty: 'EASY' },
      { id: 'topic_006', unitId: 'unit_001', name: 'CAD/CAM Systems', description: 'Computer-aided design and manufacturing', order: 6, difficulty: 'MEDIUM' },
      { id: 'topic_007', unitId: 'unit_001', name: 'Robotic Systems', description: 'Industrial robotics and automation', order: 7, difficulty: 'HARD' },

      // Unit 2: Engineering Past, Present and Future
      { id: 'topic_008', unitId: 'unit_002', name: 'Historical Technological Developments', description: 'Key engineering innovations through history', order: 1, difficulty: 'EASY' },
      { id: 'topic_009', unitId: 'unit_002', name: 'Development of Materials', description: 'Evolution of engineering materials', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_010', unitId: 'unit_002', name: 'Industrial Revolutions', description: 'The four industrial revolutions', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_011', unitId: 'unit_002', name: 'Innovation in Engineering', description: 'Modern engineering innovation and future trends', order: 4, difficulty: 'MEDIUM' },

      // Unit 3: Engineering Representation
      { id: 'topic_012', unitId: 'unit_003', name: 'Engineering Drawings', description: 'Reading and interpreting engineering drawings', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_013', unitId: 'unit_003', name: 'Orthographic Projection', description: 'First and third angle projection', order: 2, difficulty: 'HARD' },
      { id: 'topic_014', unitId: 'unit_003', name: 'Isometric Drawings', description: 'Creating isometric representations', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_015', unitId: 'unit_003', name: 'Dimensioning and Tolerancing', description: 'Geometric dimensioning and tolerancing (GD&T)', order: 4, difficulty: 'HARD' },

      // Unit 4: Essential Maths
      { id: 'topic_016', unitId: 'unit_004', name: 'Arithmetic and Algebra', description: 'Basic arithmetic operations and algebraic manipulation', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_017', unitId: 'unit_004', name: 'Geometry', description: 'Areas, volumes and geometric relationships', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_018', unitId: 'unit_004', name: 'Trigonometry', description: 'Sin, cos, tan and solving triangles', order: 3, difficulty: 'HARD' },
      { id: 'topic_019', unitId: 'unit_004', name: 'Differentiation', description: 'Derivatives and rates of change', order: 4, difficulty: 'HARD' },
      { id: 'topic_020', unitId: 'unit_004', name: 'Integration', description: 'Integration and areas under curves', order: 5, difficulty: 'HARD' },

      // Unit 5: Essential Science
      { id: 'topic_021', unitId: 'unit_005', name: 'Forces and Motion', description: 'Newton\'s laws and motion principles', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_022', unitId: 'unit_005', name: 'Energy and Power', description: 'Energy conservation and power calculations', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_023', unitId: 'unit_005', name: 'Heat Transfer', description: 'Conduction, convection and radiation', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_024', unitId: 'unit_005', name: 'Electrical Science', description: 'Current, voltage, resistance and Ohm\'s law', order: 4, difficulty: 'MEDIUM' },

      // Unit 6: Materials and Properties
      { id: 'topic_025', unitId: 'unit_006', name: 'Metals', description: 'Ferrous and non-ferrous metals', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_026', unitId: 'unit_006', name: 'Polymers', description: 'Thermoplastics and thermosets', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_027', unitId: 'unit_006', name: 'Mechanical Properties', description: 'Strength, hardness, ductility and toughness', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_028', unitId: 'unit_006', name: 'Sustainability of Materials', description: 'Environmental impact and recycling', order: 4, difficulty: 'EASY' },

      // Unit 7: Mechanical Principles
      { id: 'topic_029', unitId: 'unit_007', name: 'Forces and Moments', description: 'Force systems and moment calculations', order: 1, difficulty: 'HARD' },
      { id: 'topic_030', unitId: 'unit_007', name: 'Stress, Strain and Deformation', description: 'Material behavior under load', order: 2, difficulty: 'HARD' },
      { id: 'topic_031', unitId: 'unit_007', name: 'Gears and Mechanisms', description: 'Gear ratios and mechanical advantage', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_032', unitId: 'unit_007', name: 'Hydraulics and Pneumatics', description: 'Fluid power systems', order: 4, difficulty: 'MEDIUM' },

      // Unit 8: Electrical and Electronic Principles
      { id: 'topic_033', unitId: 'unit_008', name: 'Electrical Quantities', description: 'Voltage, current, resistance and power', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_034', unitId: 'unit_008', name: 'DC and AC Circuits', description: 'Series and parallel circuits', order: 2, difficulty: 'HARD' },
      { id: 'topic_035', unitId: 'unit_008', name: 'Sensors and Actuators', description: 'Input and output devices', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_036', unitId: 'unit_008', name: 'Safety in Electrical Systems', description: 'Electrical safety practices', order: 4, difficulty: 'EASY' },

      // Unit 9: Mechatronics
      { id: 'topic_037', unitId: 'unit_009', name: 'Integrated Mechanical and Electronic Systems', description: 'Combining mechanical and electronic components', order: 1, difficulty: 'HARD' },
      { id: 'topic_038', unitId: 'unit_009', name: 'Sensors and Control', description: 'Feedback and control systems', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_039', unitId: 'unit_009', name: 'Applications of Mechatronics', description: 'Real-world mechatronic systems', order: 3, difficulty: 'MEDIUM' },

      // Unit 10: Control Systems
      { id: 'topic_040', unitId: 'unit_010', name: 'Open-loop and Closed-loop Systems', description: 'Control system types', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_041', unitId: 'unit_010', name: 'PLCs', description: 'Programmable Logic Controllers', order: 2, difficulty: 'HARD' },
      { id: 'topic_042', unitId: 'unit_010', name: 'Industrial Automation', description: 'Automated manufacturing systems', order: 3, difficulty: 'MEDIUM' },

      // Unit 11: Quality Management
      { id: 'topic_043', unitId: 'unit_011', name: 'Quality Planning', description: 'Quality management systems', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_044', unitId: 'unit_011', name: 'Quality Control Tools', description: 'Statistical process control and inspection', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_045', unitId: 'unit_011', name: 'Standards and Compliance', description: 'ISO standards and quality certification', order: 3, difficulty: 'EASY' },

      // Unit 12: Health and Safety
      { id: 'topic_046', unitId: 'unit_012', name: 'Health and Safety Legislation', description: 'UK health and safety laws', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_047', unitId: 'unit_012', name: 'Risk Assessment', description: 'Identifying and controlling hazards', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_048', unitId: 'unit_012', name: 'COSHH', description: 'Control of Substances Hazardous to Health', order: 3, difficulty: 'MEDIUM' },
      { id: 'topic_049', unitId: 'unit_012', name: 'PPE', description: 'Personal Protective Equipment', order: 4, difficulty: 'EASY' },

      // Unit 13: Commercial and Financial Awareness
      { id: 'topic_050', unitId: 'unit_013', name: 'Business Structures', description: 'Types of business organizations', order: 1, difficulty: 'EASY' },
      { id: 'topic_051', unitId: 'unit_013', name: 'Costs and Pricing', description: 'Fixed and variable costs', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_052', unitId: 'unit_013', name: 'Supply Chains', description: 'Supply chain management', order: 3, difficulty: 'MEDIUM' },

      // Unit 14: Professional Responsibilities
      { id: 'topic_053', unitId: 'unit_014', name: 'Ethics in Engineering', description: 'Professional ethics and conduct', order: 1, difficulty: 'EASY' },
      { id: 'topic_054', unitId: 'unit_014', name: 'Teamwork and Communication', description: 'Working effectively in teams', order: 2, difficulty: 'EASY' },
      { id: 'topic_055', unitId: 'unit_014', name: 'Equality, Diversity and Inclusion', description: 'Inclusive workplace practices', order: 3, difficulty: 'EASY' },

      // Unit 15: Project Management
      { id: 'topic_056', unitId: 'unit_015', name: 'Project Planning', description: 'Planning and scheduling projects', order: 1, difficulty: 'MEDIUM' },
      { id: 'topic_057', unitId: 'unit_015', name: 'Risk Management', description: 'Identifying and mitigating project risks', order: 2, difficulty: 'MEDIUM' },
      { id: 'topic_058', unitId: 'unit_015', name: 'Monitoring and Evaluation', description: 'Tracking project progress', order: 3, difficulty: 'MEDIUM' },
    ];

    await prisma.topic.createMany({ data: topics });

    // Create comprehensive problems for each topic
    const problems: any[] = [];

    // Helper function to create 3 problems per topic
    const addProblemsForTopic = (topicId: string, topicName: string, easyQ: any, mediumQ: any, hardQ: any) => {
      problems.push(
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          ...easyQ,
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          ...mediumQ,
          estimatedTime: 90,
          examRelevance: true,
        },
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'HARD',
          ...hardQ,
          estimatedTime: 120,
          examRelevance: true,
        }
      );
    };

    // Unit 1: Working Within Engineering
    addProblemsForTopic('topic_001', 'Manufacturing Processes',
      {
        template: 'Which manufacturing process involves removing material from a workpiece?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Subtractive manufacturing',
          wrongAnswers: ['Additive manufacturing', 'Casting', 'Forming'],
          explanation: 'Subtractive manufacturing removes material through processes like milling, turning and drilling.',
        }),
        tags: 'manufacturing,processes',
      },
      {
        template: 'What is the main advantage of CNC machining over manual machining?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Higher precision and repeatability',
          wrongAnswers: ['Lower cost', 'No programming required', 'Faster for one-off parts'],
          explanation: 'CNC machines offer superior precision and can produce identical parts consistently.',
        }),
        tags: 'manufacturing,cnc',
      },
      {
        template: 'In injection moulding, what is the purpose of the cooling phase?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'To solidify the plastic in the mould',
          wrongAnswers: ['To heat the plastic', 'To eject the part', 'To clean the mould'],
          explanation: 'Cooling allows the molten plastic to solidify and take the shape of the mould cavity.',
        }),
        tags: 'manufacturing,moulding',
      }
    );

    addProblemsForTopic('topic_004', 'Types of Maintenance',
      {
        template: 'Which type of maintenance is performed before a failure occurs?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Preventive maintenance',
          wrongAnswers: ['Corrective maintenance', 'Breakdown maintenance', 'Emergency maintenance'],
          explanation: 'Preventive maintenance is scheduled maintenance performed to prevent failures.',
        }),
        tags: 'maintenance,types',
      },
      {
        template: 'What is predictive maintenance based on?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Condition monitoring data',
          wrongAnswers: ['Fixed time intervals', 'Random selection', 'Visual inspection only'],
          explanation: 'Predictive maintenance uses data from sensors and monitoring to predict when maintenance is needed.',
        }),
        tags: 'maintenance,predictive',
      },
      {
        template: 'Which maintenance strategy has the lowest cost but highest risk of failure?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Run-to-failure (reactive)',
          wrongAnswers: ['Preventive', 'Predictive', 'Proactive'],
          explanation: 'Run-to-failure waits for equipment to break down, which is cheap initially but risky.',
        }),
        tags: 'maintenance,strategy',
      }
    );

    // Unit 4: Essential Maths
    addProblemsForTopic('topic_016', 'Arithmetic and Algebra',
      {
        template: 'What is the value of 2³?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '8',
          wrongAnswers: ['6', '9', '12'],
          explanation: '2³ = 2 × 2 × 2 = 8',
        }),
        tags: 'maths,powers',
      },
      {
        template: 'If 3x + 5 = 20, what is the value of x?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '5',
          wrongAnswers: ['3', '4', '6'],
          explanation: '3x = 20 - 5 = 15, therefore x = 15/3 = 5',
        }),
        tags: 'maths,equations',
      },
      {
        template: 'Simplify: (x² × x³) ÷ x',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x⁴',
          wrongAnswers: ['x²', 'x³', 'x⁵'],
          explanation: 'x² × x³ = x⁵, then x⁵ ÷ x = x⁴',
        }),
        tags: 'maths,algebra',
      }
    );

    addProblemsForTopic('topic_018', 'Trigonometry',
      {
        template: 'In a right-angled triangle, what does SOH stand for in SOHCAHTOA?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Sin = Opposite / Hypotenuse',
          wrongAnswers: ['Sin = Opposite / Height', 'Sin = Opposite × Hypotenuse', 'Sum Of Heights'],
          explanation: 'SOH means Sine equals Opposite divided by Hypotenuse.',
        }),
        tags: 'maths,trig',
      },
      {
        template: 'What is the value of sin(90°)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '1',
          wrongAnswers: ['0', '0.5', '√2/2'],
          explanation: 'sin(90°) = 1, as the opposite side equals the hypotenuse at 90°.',
        }),
        tags: 'maths,trig-values',
      },
      {
        template: 'In a right triangle, if the opposite side is 3 and the adjacent side is 4, what is tan(θ)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0.75',
          wrongAnswers: ['0.6', '1.33', '5'],
          explanation: 'tan(θ) = opposite/adjacent = 3/4 = 0.75',
        }),
        tags: 'maths,trig-calc',
      }
    );

    // Unit 5: Essential Science
    addProblemsForTopic('topic_021', 'Forces and Motion',
      {
        template: 'What is the SI unit of force?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Newton (N)',
          wrongAnswers: ['Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          explanation: 'The Newton (N) is the SI unit of force, named after Sir Isaac Newton.',
        }),
        tags: 'science,forces,units',
      },
      {
        template: "Which of Newton's laws states: For every action, there is an equal and opposite reaction?",
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: "Newton's Third Law",
          wrongAnswers: ["Newton's First Law", "Newton's Second Law", "Law of Universal Gravitation"],
          explanation: "Newton's Third Law states that action and reaction forces are equal and opposite.",
        }),
        tags: 'science,newtons-laws',
      },
      {
        template: 'A car of mass 1000kg accelerates from rest to 20m/s in 10 seconds. What is the net force?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2000 N',
          wrongAnswers: ['1000 N', '20000 N', '200 N'],
          explanation: 'Using F = ma: acceleration = (20-0)/10 = 2 m/s², so F = 1000 × 2 = 2000 N.',
        }),
        tags: 'science,calculations',
      }
    );

    addProblemsForTopic('topic_024', 'Electrical Science',
      {
        template: "What does Ohm's law state?",
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'V = I × R',
          wrongAnswers: ['V = I / R', 'V = R / I', 'V = I + R'],
          explanation: "Ohm's law states that Voltage equals Current multiplied by Resistance.",
        }),
        tags: 'science,electricity',
      },
      {
        template: 'If a circuit has a voltage of 12V and resistance of 4Ω, what is the current?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '3 A',
          wrongAnswers: ['2 A', '4 A', '48 A'],
          explanation: 'Using I = V/R: I = 12/4 = 3 A',
        }),
        tags: 'science,ohms-law',
      },
      {
        template: 'What happens to current in a series circuit?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'It stays the same throughout',
          wrongAnswers: ['It decreases', 'It increases', 'It varies randomly'],
          explanation: 'In a series circuit, current is constant throughout all components.',
        }),
        tags: 'science,circuits',
      }
    );

    // Unit 6: Materials and Properties
    addProblemsForTopic('topic_027', 'Mechanical Properties',
      {
        template: "Which property describes a material's ability to be drawn into wires?",
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Ductility',
          wrongAnswers: ['Malleability', 'Hardness', 'Brittleness'],
          explanation: 'Ductility is the ability to be drawn into wires without breaking.',
        }),
        tags: 'materials,properties',
      },
      {
        template: 'What type of stress occurs when pulling forces are applied to a material?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Tensile stress',
          wrongAnswers: ['Compressive stress', 'Shear stress', 'Torsional stress'],
          explanation: 'Tensile stress results from pulling or stretching forces.',
        }),
        tags: 'materials,stress',
      },
      {
        template: 'Which heat treatment process increases steel hardness through rapid cooling?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Quenching',
          wrongAnswers: ['Annealing', 'Tempering', 'Normalizing'],
          explanation: 'Quenching involves rapid cooling to increase hardness.',
        }),
        tags: 'materials,heat-treatment',
      }
    );

    // Unit 12: Health and Safety
    addProblemsForTopic('topic_046', 'Health and Safety Legislation',
      {
        template: 'Which Act is the primary health and safety legislation in the UK?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Health and Safety at Work Act 1974',
          wrongAnswers: ['Safety Act 1990', 'Workplace Safety Act 2000', 'Employment Act 1974'],
          explanation: 'The Health and Safety at Work Act 1974 is the main UK safety legislation.',
        }),
        tags: 'safety,legislation',
      },
      {
        template: 'Who is responsible for health and safety in the workplace?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Everyone - employers and employees',
          wrongAnswers: ['Only employers', 'Only health and safety officers', 'Only managers'],
          explanation: 'Health and safety is a shared responsibility between all parties.',
        }),
        tags: 'safety,responsibility',
      },
      {
        template: 'What is the minimum number of employees before written health and safety policy is required?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '5 employees',
          wrongAnswers: ['10 employees', '20 employees', '50 employees'],
          explanation: 'Employers with 5 or more employees must have a written safety policy.',
        }),
        tags: 'safety,policy',
      }
    );

    addProblemsForTopic('topic_047', 'Risk Assessment',
      {
        template: 'What is the first step in a risk assessment?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Identify the hazards',
          wrongAnswers: ['Implement controls', 'Review the assessment', 'Train employees'],
          explanation: 'The first step is always to identify potential hazards.',
        }),
        tags: 'safety,risk',
      },
      {
        template: 'What does the term "hazard" mean?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Something with the potential to cause harm',
          wrongAnswers: ['An accident that has happened', 'Safety equipment', 'A safety procedure'],
          explanation: 'A hazard is anything with the potential to cause harm.',
        }),
        tags: 'safety,definitions',
      },
      {
        template: 'How often should risk assessments be reviewed?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Regularly and when circumstances change',
          wrongAnswers: ['Once a year only', 'Never, once completed', 'Every 5 years'],
          explanation: 'Risk assessments should be reviewed regularly and whenever there are significant changes.',
        }),
        tags: 'safety,review',
      }
    );

    // Add generic problems for remaining topics
    for (const topic of topics) {
      const topicId = topic.id;
      const topicName = topic.name;

      // Skip topics we've already added detailed problems for
      const detailedTopics = ['topic_001', 'topic_004', 'topic_016', 'topic_018', 'topic_021', 'topic_024', 'topic_027', 'topic_046', 'topic_047'];
      if (detailedTopics.includes(topicId)) continue;

      problems.push(
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'EASY',
          template: `What is a fundamental concept in ${topicName}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Understanding core principles',
            wrongAnswers: ['Ignoring safety', 'Skipping procedures', 'Avoiding standards'],
            explanation: `${topicName} requires solid understanding of fundamental concepts.`,
          }),
          tags: 'basics',
          estimatedTime: 60,
          examRelevance: true,
        },
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'MEDIUM',
          template: `Which standard or practice applies to ${topicName}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Industry best practices',
            wrongAnswers: ['No standards apply', 'Outdated methods', 'Informal approaches'],
            explanation: `${topicName} follows established industry standards and best practices.`,
          }),
          tags: 'standards',
          estimatedTime: 90,
          examRelevance: true,
        },
        {
          topicId,
          type: 'MULTIPLE_CHOICE',
          difficulty: 'HARD',
          template: `What advanced skill is required in ${topicName}?`,
          variables: '{}',
          solution: JSON.stringify({
            correctAnswer: 'Critical analysis and problem solving',
            wrongAnswers: ['Memorization only', 'Following instructions blindly', 'Avoiding complexity'],
            explanation: `Advanced ${topicName} requires analytical thinking and problem-solving skills.`,
          }),
          tags: 'advanced',
          estimatedTime: 120,
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
      message: 'Complete T-Level Engineering database seeded!',
      unitCount,
      topicCount,
      problemCount,
      units: units.map(u => u.name),
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
