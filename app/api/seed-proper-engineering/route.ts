import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * REAL ENGINEERING QUESTIONS - No placeholders
 * Every question teaches actual subject matter
 * Wrong answers are realistic misconceptions, not generic nonsense
 */
export async function GET() {
  try {
    console.log('Creating REAL engineering questions...');

    const allTopics = await prisma.topic.findMany({
      include: { unit: true },
    });

    const engineeringTopics = allTopics.filter(t =>
      ['UNIT_4', 'UNIT_5', 'UNIT_6'].includes(t.unit.code)
    );

    // Delete existing engineering problems
    await prisma.problem.deleteMany({
      where: { topic: { unit: { code: { in: ['UNIT_4', 'UNIT_5', 'UNIT_6'] } } } }
    });

    const problems: any[] = [];

    // Helper function to add problems
    const addProblems = (topicName: string, questionArray: any[]) => {
      const topic = engineeringTopics.find(t => t.name === topicName);
      if (topic) {
        questionArray.forEach(q => {
          problems.push({ ...q, topicId: topic.id, examRelevance: true });
        });
      }
    };

    // ========== UNIT 4: ESSENTIAL MATHS ==========

    // ARITHMETIC & ALGEBRA
    addProblems('Arithmetic & Algebra', [
      {
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'Calculate: {a} + {b} × {c}',
        variables: JSON.stringify({ a: { min: 5, max: 20 }, b: { min: 2, max: 10 }, c: { min: 3, max: 8 } }),
        solution: JSON.stringify({
          formula: 'a + (b * c)',
          explanation: 'Order of operations: multiply first, then add (BODMAS)',
        }),
        tags: 'arithmetic,bodmas',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Simplify: 3x + 5x',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '8x',
          wrongAnswers: ['8x²', '15x', '8'],
          explanation: 'Combine like terms: 3x + 5x = 8x',
        }),
        tags: 'algebra,simplification',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Expand: (x + 3)(x + 2)',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x² + 5x + 6',
          wrongAnswers: ['x² + 6', 'x² + 5x', '2x + 5'],
          explanation: 'Use FOIL: x² + 2x + 3x + 6 = x² + 5x + 6',
        }),
        tags: 'algebra,expansion',
        estimatedTime: 90,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Solve for x: {a}x + {b} = {c}',
        variables: JSON.stringify({ a: { min: 2, max: 8 }, b: { min: 5, max: 20 }, c: { min: 15, max: 50 } }),
        solution: JSON.stringify({
          formula: '(c - b) / a',
          explanation: 'Subtract b from both sides, then divide by a',
        }),
        tags: 'algebra,equations',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the value of 2³?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '8',
          wrongAnswers: ['6', '9', '16'],
          explanation: '2³ = 2 × 2 × 2 = 8',
        }),
        tags: 'powers',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Factorize: x² + 7x + 12',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '(x + 3)(x + 4)',
          wrongAnswers: ['(x + 2)(x + 6)', '(x + 1)(x + 12)', '(x + 7)(x + 12)'],
          explanation: 'Find two numbers that multiply to 12 and add to 7: 3 and 4',
        }),
        tags: 'algebra,factorization',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Solve: x² - 5x + 6 = 0',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x = 2 or x = 3',
          wrongAnswers: ['x = -2 or x = -3', 'x = 1 or x = 6', 'x = 5 or x = 6'],
          explanation: 'Factorize: (x - 2)(x - 3) = 0, so x = 2 or 3',
        }),
        tags: 'algebra,quadratics',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is √16?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '4',
          wrongAnswers: ['8', '2', '256'],
          explanation: '4 × 4 = 16, so √16 = 4',
        }),
        tags: 'square-roots',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Simplify: (2a³)²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '4a⁶',
          wrongAnswers: ['2a⁶', '4a⁵', '2a⁵'],
          explanation: '(2a³)² = 2² × (a³)² = 4a⁶',
        }),
        tags: 'algebra,powers',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Simplify: a⁸ ÷ a⁵',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'a³',
          wrongAnswers: ['a¹³', 'a⁴⁰', 'a²'],
          explanation: 'When dividing powers: subtract indices: 8 - 5 = 3',
        }),
        tags: 'algebra,indices',
        estimatedTime: 90,
      },
    ]);

    // REARRANGING FORMULAE
    addProblems('Rearranging Formulae', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make x the subject: y = x + 5',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x = y - 5',
          wrongAnswers: ['x = y + 5', 'x = 5 - y', 'y = x - 5'],
          explanation: 'Subtract 5 from both sides',
        }),
        tags: 'formulae',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make r the subject: v = πr²h',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'r = √(v/πh)',
          wrongAnswers: ['r = v/πh', 'r = √(v/π)', 'r² = v/πh'],
          explanation: 'Divide by πh, then square root both sides',
        }),
        tags: 'formulae,square-root',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make t the subject: v = u + at',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 't = (v - u)/a',
          wrongAnswers: ['t = v - u - a', 't = a/(v - u)', 't = (v + u)/a'],
          explanation: 'Subtract u, then divide by a',
        }),
        tags: 'formulae,physics',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make b the subject: A = ½(a + b)h',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'b = (2A/h) - a',
          wrongAnswers: ['b = 2A/h + a', 'b = A/h - a', 'b = (A - a)/2h'],
          explanation: 'Multiply by 2, divide by h, subtract a',
        }),
        tags: 'formulae,trapezium',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Make m the subject: E = mc²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'm = E/c²',
          wrongAnswers: ['m = Ec²', 'm = √(E/c)', 'm = E/c'],
          explanation: 'Divide both sides by c²',
        }),
        tags: 'formulae,einstein',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make h the subject: V = πr²h',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'h = V/(πr²)',
          wrongAnswers: ['h = V/πr', 'h = Vπr²', 'h = √(V/πr)'],
          explanation: 'Divide both sides by πr²',
        }),
        tags: 'formulae,cylinder',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make C the subject: F = 9C/5 + 32',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'C = 5(F - 32)/9',
          wrongAnswers: ['C = 9(F - 32)/5', 'C = 5F/9 - 32', 'C = (F + 32) × 5/9'],
          explanation: 'Subtract 32, multiply by 5, divide by 9',
        }),
        tags: 'formulae,temperature',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Make x the subject: y = (x + 3)/(x - 2)',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x = (2y + 3)/(y - 1)',
          wrongAnswers: ['x = (y - 3)/(y + 2)', 'x = y(x - 2) - 3', 'x = 3y - 2'],
          explanation: 'Multiply by (x-2), collect x terms, factorize',
        }),
        tags: 'formulae,fractions',
        estimatedTime: 150,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Make g the subject: T = 2π√(L/g)',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'g = 4π²L/T²',
          wrongAnswers: ['g = L/T²', 'g = 2πL/T', 'g = LT²/(4π²)'],
          explanation: 'Square both sides, rearrange for g',
        }),
        tags: 'formulae,pendulum',
        estimatedTime: 150,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Make w the subject: P = 2(l + w)',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'w = P/2 - l',
          wrongAnswers: ['w = P - 2l', 'w = (P - l)/2', 'w = 2P - l'],
          explanation: 'Divide by 2, subtract l',
        }),
        tags: 'formulae,perimeter',
        estimatedTime: 90,
      },
    ]);

    // RATIOS & PROPORTIONS
    addProblems('Ratios & Proportions', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Simplify the ratio 12:18',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2:3',
          wrongAnswers: ['6:9', '4:6', '1:2'],
          explanation: 'Divide both by 6 (HCF)',
        }),
        tags: 'ratios',
        estimatedTime: 60,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Share £{total} in ratio {a}:{b}. How much does the first person get?',
        variables: JSON.stringify({ total: { min: 60, max: 120, step: 20 }, a: { min: 2, max: 5 }, b: { min: 2, max: 5 } }),
        solution: JSON.stringify({
          formula: 'total * a / (a + b)',
          explanation: 'First person gets a/(a+b) of total',
        }),
        tags: 'ratios,sharing',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'If 5 apples cost £2, how much do 15 apples cost?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '£6',
          wrongAnswers: ['£10', '£7.50', '£3'],
          explanation: '15 is 3 times 5, so cost is 3 × £2 = £6',
        }),
        tags: 'proportion,direct',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'A map scale is 1:50000. If distance on map is 4cm, what is real distance?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2km',
          wrongAnswers: ['200m', '20km', '500m'],
          explanation: '4cm × 50000 = 200000cm = 2000m = 2km',
        }),
        tags: 'ratios,maps,scale',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Concrete mix is cement:sand:gravel = 1:2:4. How much cement for 35kg mix?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '5kg',
          wrongAnswers: ['7kg', '10kg', '17.5kg'],
          explanation: 'Total parts = 1+2+4 = 7. Cement = 1/7 × 35 = 5kg',
        }),
        tags: 'ratios,mixture',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'y is inversely proportional to x. When x=2, y=6. Find y when x=3.',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '4',
          wrongAnswers: ['9', '2', '6'],
          explanation: 'y = k/x. Find k: 6 = k/2, k=12. So y = 12/3 = 4',
        }),
        tags: 'proportion,inverse',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Write 3:5 as a fraction',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '3/5',
          wrongAnswers: ['5/3', '3/8', '5/8'],
          explanation: 'First number over second number',
        }),
        tags: 'ratios,fractions',
        estimatedTime: 60,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A recipe for {people} people uses {amount}g sugar. How much for 10 people?',
        variables: JSON.stringify({ people: { min: 4, max: 8, step: 2 }, amount: { min: 100, max: 200, step: 50 } }),
        solution: JSON.stringify({
          formula: 'amount * 10 / people',
          explanation: 'Direct proportion: scale up proportionally',
        }),
        tags: 'proportion,recipes',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: '4 workers complete job in 6 days. How many days for 3 workers?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '8 days',
          wrongAnswers: ['4.5 days', '6 days', '9 days'],
          explanation: 'Inverse: 4×6 = 24 worker-days. 24÷3 = 8 days',
        }),
        tags: 'proportion,inverse,workers',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Express 40cm as a ratio of 1m',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2:5',
          wrongAnswers: ['4:10', '40:100', '1:2.5'],
          explanation: '40cm:100cm = 40:100 = 2:5',
        }),
        tags: 'ratios,units',
        estimatedTime: 90,
      },
    ]);

    // GEOMETRY
    addProblems('Geometry', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the sum of angles in a triangle?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '180°',
          wrongAnswers: ['90°', '360°', '270°'],
          explanation: 'The angles in any triangle always add to 180°',
        }),
        tags: 'angles,triangles',
        estimatedTime: 60,
      },
      {
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'Find area of rectangle: length {l}cm, width {w}cm',
        variables: JSON.stringify({ l: { min: 5, max: 15 }, w: { min: 3, max: 10 } }),
        solution: JSON.stringify({
          formula: 'l * w',
          explanation: 'Area = length × width',
        }),
        tags: 'area,rectangle',
        estimatedTime: 60,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Circle radius {r}cm. Find circumference (use π ≈ 3.14)',
        variables: JSON.stringify({ r: { min: 3, max: 10 } }),
        solution: JSON.stringify({
          formula: '2 * 3.14 * r',
          explanation: 'Circumference = 2πr',
        }),
        tags: 'circles,circumference',
        estimatedTime: 90,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Circle radius {r}cm. Find area (use π ≈ 3.14)',
        variables: JSON.stringify({ r: { min: 3, max: 8 } }),
        solution: JSON.stringify({
          formula: '3.14 * r * r',
          explanation: 'Area = πr²',
        }),
        tags: 'circles,area',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'How many sides does a hexagon have?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '6',
          wrongAnswers: ['5', '7', '8'],
          explanation: 'Hexa- means six',
        }),
        tags: 'polygons',
        estimatedTime: 60,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Triangle: base {b}cm, height {h}cm. Find area.',
        variables: JSON.stringify({ b: { min: 6, max: 14, step: 2 }, h: { min: 4, max: 12, step: 2 } }),
        solution: JSON.stringify({
          formula: '0.5 * b * h',
          explanation: 'Area = ½ × base × height',
        }),
        tags: 'area,triangle',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is the sum of angles in a quadrilateral?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '360°',
          wrongAnswers: ['180°', '270°', '540°'],
          explanation: 'Quadrilateral = 2 triangles, so 2 × 180° = 360°',
        }),
        tags: 'angles,quadrilaterals',
        estimatedTime: 75,
      },
      {
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'Cube has edge length {s}cm. Find volume.',
        variables: JSON.stringify({ s: { min: 3, max: 8 } }),
        solution: JSON.stringify({
          formula: 's * s * s',
          explanation: 'Volume = s³',
        }),
        tags: 'volume,cube',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'A regular pentagon has how many lines of symmetry?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '5',
          wrongAnswers: ['10', '0', '2'],
          explanation: 'Regular pentagon has 5 lines of symmetry',
        }),
        tags: 'symmetry,polygons',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Angles on a straight line add to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '180°',
          wrongAnswers: ['90°', '360°', '270°'],
          explanation: 'Straight line = 180°',
        }),
        tags: 'angles,lines',
        estimatedTime: 60,
      },
    ]);

    // TRIGONOMETRY
    addProblems('Trigonometry', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'In SOH-CAH-TOA, what does SOH stand for?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Sin = Opposite / Hypotenuse',
          wrongAnswers: ['Sin = Adjacent / Hypotenuse', 'Sin = Opposite / Adjacent', 'Sin = Hypotenuse / Opposite'],
          explanation: 'SOH: Sine = Opposite over Hypotenuse',
        }),
        tags: 'trigonometry,soh-cah-toa',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is sin(30°)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0.5',
          wrongAnswers: ['0.707', '0.866', '1'],
          explanation: 'sin(30°) = 1/2 = 0.5 (standard angle)',
        }),
        tags: 'trigonometry,special-angles',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is cos(60°)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0.5',
          wrongAnswers: ['0.707', '0.866', '1'],
          explanation: 'cos(60°) = 1/2 = 0.5',
        }),
        tags: 'trigonometry,special-angles',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'In a right-angled triangle, which side is the hypotenuse?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'The longest side opposite the right angle',
          wrongAnswers: ['The shortest side', 'The side next to the right angle', 'Any of the three sides'],
          explanation: 'Hypotenuse is always opposite the 90° angle',
        }),
        tags: 'trigonometry,triangles',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is tan(45°)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '1',
          wrongAnswers: ['0', '0.5', '0.707'],
          explanation: 'tan(45°) = 1 (opposite = adjacent at 45°)',
        }),
        tags: 'trigonometry,special-angles',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'If sin(θ) = 0.6, what is sin(180° - θ)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0.6',
          wrongAnswers: ['-0.6', '0.8', '0.4'],
          explanation: 'sin(180° - θ) = sin(θ) (supplementary angles)',
        }),
        tags: 'trigonometry,identities',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What does CAH represent in SOH-CAH-TOA?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Cos = Adjacent / Hypotenuse',
          wrongAnswers: ['Cos = Angle / Hypotenuse', 'Cos = Adjacent / Height', 'Cos = Opposite / Hypotenuse'],
          explanation: 'CAH: Cosine = Adjacent over Hypotenuse',
        }),
        tags: 'trigonometry,soh-cah-toa',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'In a right triangle, if opposite = 3 and hypotenuse = 5, sin(θ) = ?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0.6',
          wrongAnswers: ['0.8', '1.67', '0.75'],
          explanation: 'sin = opposite/hypotenuse = 3/5 = 0.6',
        }),
        tags: 'trigonometry,calculations',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Pythagoras theorem: a² + b² = ?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'c² (where c is hypotenuse)',
          wrongAnswers: ['c (where c is hypotenuse)', 'ab', '2c'],
          explanation: 'In right triangle: a² + b² = c²',
        }),
        tags: 'pythagoras',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is sin(90°)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '1',
          wrongAnswers: ['0', '0.5', '0.707'],
          explanation: 'sin(90°) = 1 (maximum value)',
        }),
        tags: 'trigonometry,special-angles',
        estimatedTime: 60,
      },
    ]);

    console.log(`Creating ${problems.length} problems...`);
    await prisma.problem.createMany({ data: problems });

    return NextResponse.json({
      success: true,
      message: 'Real engineering questions created (first batch)',
      problemsCreated: problems.length,
      note: 'This is Part 1/3. More topics to follow.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
