import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * REAL ENGINEERING QUESTIONS - Part 2
 * Remaining Unit 4 topics + All Unit 5 & 6 topics
 */
export async function GET() {
  try {
    console.log('Creating Part 2 of real engineering questions...');

    const allTopics = await prisma.topic.findMany({
      include: { unit: true },
    });

    const problems: any[] = [];

    const addProblems = (topicName: string, questionArray: any[]) => {
      const topic = allTopics.find(t => t.name === topicName);
      if (topic) {
        questionArray.forEach(q => {
          problems.push({ ...q, topicId: topic.id, examRelevance: true });
        });
      }
    };

    // ========== UNIT 4 CONTINUED ==========

    // LOGARITHMS
    addProblems('Logarithms', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is log₁₀(100)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '2',
          wrongAnswers: ['10', '100', '1'],
          explanation: '10² = 100, so log₁₀(100) = 2',
        }),
        tags: 'logarithms',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is log₁₀(1000)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '3',
          wrongAnswers: ['10', '1000', '30'],
          explanation: '10³ = 1000, so log₁₀(1000) = 3',
        }),
        tags: 'logarithms',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'log(a) + log(b) = ?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'log(ab)',
          wrongAnswers: ['log(a+b)', 'log(a) × log(b)', 'log(a/b)'],
          explanation: 'Logarithm rule: log(a) + log(b) = log(ab)',
        }),
        tags: 'logarithms,laws',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'log(a) - log(b) = ?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'log(a/b)',
          wrongAnswers: ['log(a-b)', 'log(a) ÷ log(b)', 'log(ab)'],
          explanation: 'Logarithm rule: log(a) - log(b) = log(a/b)',
        }),
        tags: 'logarithms,laws',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'What is log(aⁿ)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'n × log(a)',
          wrongAnswers: ['log(a) × log(n)', 'log(a)ⁿ', 'log(a + n)'],
          explanation: 'Power rule: log(aⁿ) = n × log(a)',
        }),
        tags: 'logarithms,power-rule',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is log₁₀(10)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '1',
          wrongAnswers: ['10', '0', '2'],
          explanation: '10¹ = 10, so log₁₀(10) = 1',
        }),
        tags: 'logarithms',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What is log₁₀(1)?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0',
          wrongAnswers: ['1', '10', 'undefined'],
          explanation: '10⁰ = 1, so log₁₀(1) = 0',
        }),
        tags: 'logarithms',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'If log₁₀(x) = 3, what is x?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '1000',
          wrongAnswers: ['30', '3', '10'],
          explanation: 'log₁₀(x) = 3 means 10³ = x, so x = 1000',
        }),
        tags: 'logarithms,inverse',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'log₂(8) = ?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '3',
          wrongAnswers: ['2', '4', '8'],
          explanation: '2³ = 8, so log₂(8) = 3',
        }),
        tags: 'logarithms,different-bases',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'What is the relationship between log and exponentials?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'They are inverse operations',
          wrongAnswers: ['They are the same', 'They are unrelated', 'Log is a type of exponential'],
          explanation: 'log and exponentials undo each other (inverses)',
        }),
        tags: 'logarithms,exponentials',
        estimatedTime: 90,
      },
    ]);

    // DIFFERENTIATION
    addProblems('Differentiation', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Differentiate y = x²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 2x',
          wrongAnswers: ['dy/dx = x', 'dy/dx = 2x²', 'dy/dx = x²'],
          explanation: 'Power rule: bring power down, reduce power by 1',
        }),
        tags: 'differentiation,power-rule',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Differentiate y = x³',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 3x²',
          wrongAnswers: ['dy/dx = x²', 'dy/dx = 3x', 'dy/dx = x³'],
          explanation: 'Power rule: 3x³⁻¹ = 3x²',
        }),
        tags: 'differentiation,power-rule',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Differentiate y = 5x²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 10x',
          wrongAnswers: ['dy/dx = 5x', 'dy/dx = 2x', 'dy/dx = 10x²'],
          explanation: 'Multiply coefficient by power: 5 × 2x = 10x',
        }),
        tags: 'differentiation,coefficients',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What does dy/dx represent?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'The rate of change of y with respect to x',
          wrongAnswers: ['The area under the curve', 'The value of y', 'The value of x'],
          explanation: 'dy/dx is the gradient/derivative',
        }),
        tags: 'differentiation,meaning',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Differentiate y = x⁴ + 3x²',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 4x³ + 6x',
          wrongAnswers: ['dy/dx = 4x³ + 3x', 'dy/dx = x³ + 6x', 'dy/dx = 4x + 6x'],
          explanation: 'Differentiate each term separately',
        }),
        tags: 'differentiation,multiple-terms',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Differentiate y = 7',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 0',
          wrongAnswers: ['dy/dx = 7', 'dy/dx = 1', 'dy/dx = 7x'],
          explanation: 'The derivative of a constant is 0',
        }),
        tags: 'differentiation,constants',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'At a stationary point, dy/dx = ?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '0',
          wrongAnswers: ['1', 'Maximum value', 'Minimum value'],
          explanation: 'Stationary points occur when gradient = 0',
        }),
        tags: 'differentiation,stationary-points',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Differentiate y = x⁵',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 5x⁴',
          wrongAnswers: ['dy/dx = 5x⁵', 'dy/dx = x⁴', 'dy/dx = 4x⁵'],
          explanation: 'Power rule: 5x⁴',
        }),
        tags: 'differentiation,higher-powers',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'If dy/dx > 0, the function is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Increasing',
          wrongAnswers: ['Decreasing', 'Constant', 'At a maximum'],
          explanation: 'Positive gradient means increasing',
        }),
        tags: 'differentiation,gradient',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Differentiate y = 2x³ - 4x + 5',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'dy/dx = 6x² - 4',
          wrongAnswers: ['dy/dx = 6x² - 4x', 'dy/dx = 2x² - 4', 'dy/dx = 6x² - 4x + 5'],
          explanation: 'Each term: 2×3x² = 6x², -4×1 = -4, constant→0',
        }),
        tags: 'differentiation,polynomials',
        estimatedTime: 120,
      },
    ]);

    // INTEGRATION
    addProblems('Integration', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Integrate ∫2x dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x² + c',
          wrongAnswers: ['2x² + c', 'x + c', '2x'],
          explanation: 'Add 1 to power, divide by new power: 2x²/2 = x²',
        }),
        tags: 'integration,basic',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Integrate ∫x dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x²/2 + c',
          wrongAnswers: ['x² + c', 'x/2 + c', '2x + c'],
          explanation: 'x¹ → x²/2',
        }),
        tags: 'integration,basic',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Integrate ∫x² dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x³/3 + c',
          wrongAnswers: ['x³ + c', '2x + c', '3x² + c'],
          explanation: 'Add 1 to power: x³, divide by 3',
        }),
        tags: 'integration,powers',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What does the "+ c" represent in integration?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'The constant of integration',
          wrongAnswers: ['The coefficient', 'The power', 'An error'],
          explanation: 'c is the constant of integration (indefinite integral)',
        }),
        tags: 'integration,constant',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Integrate ∫3x² dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x³ + c',
          wrongAnswers: ['3x³ + c', 'x³/3 + c', '6x + c'],
          explanation: '3 × x³/3 = x³',
        }),
        tags: 'integration,coefficients',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Integrate ∫5 dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '5x + c',
          wrongAnswers: ['5 + c', '0', 'x + c'],
          explanation: 'Integral of constant k is kx',
        }),
        tags: 'integration,constants',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'What does integration represent geometrically?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'The area under a curve',
          wrongAnswers: ['The gradient of a curve', 'The y-intercept', 'The maximum point'],
          explanation: 'Definite integral = area under curve',
        }),
        tags: 'integration,meaning',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'If differentiation and integration are inverse operations, then:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Differentiating an integral returns the original function',
          wrongAnswers: ['They give the same result', 'They cannot be used together', 'Integration is not needed'],
          explanation: 'd/dx[∫f(x)dx] = f(x)',
        }),
        tags: 'integration,differentiation',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Integrate ∫(2x + 3) dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x² + 3x + c',
          wrongAnswers: ['2x² + 3x + c', 'x² + 3 + c', '2x + 3x + c'],
          explanation: 'Integrate each term: x² + 3x + c',
        }),
        tags: 'integration,binomials',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Integrate ∫x³ dx',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'x⁴/4 + c',
          wrongAnswers: ['x⁴ + c', '3x² + c', '4x³ + c'],
          explanation: 'x³ → x⁴/4',
        }),
        tags: 'integration,higher-powers',
        estimatedTime: 90,
      },
    ]);

    // ========== UNIT 5: ESSENTIAL SCIENCE ==========

    // FORCES & MOTION
    addProblems('Forces & Motion', [
      {
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'A car accelerates from 0 to {v}m/s in {t}s. Calculate acceleration.',
        variables: JSON.stringify({ v: { min: 10, max: 30, step: 5 }, t: { min: 4, max: 12, step: 2 } }),
        solution: JSON.stringify({
          formula: 'v / t',
          explanation: 'a = Δv/t = (v-0)/t',
        }),
        tags: 'forces,acceleration',
        estimatedTime: 90,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A {F}N force acts on {m}kg. Calculate acceleration.',
        variables: JSON.stringify({ F: { min: 20, max: 100, step: 20 }, m: { min: 2, max: 20, step: 2 } }),
        solution: JSON.stringify({
          formula: 'F / m',
          explanation: 'F = ma, so a = F/m',
        }),
        tags: 'forces,newtons-law',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Newton\'s First Law states:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'An object remains at rest or in motion unless acted upon by a force',
          wrongAnswers: ['F = ma', 'Every action has an equal and opposite reaction', 'Energy is conserved'],
          explanation: 'Law of Inertia',
        }),
        tags: 'forces,newtons-laws',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'If mass doubles and force stays constant, acceleration:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Halves',
          wrongAnswers: ['Doubles', 'Stays the same', 'Quarters'],
          explanation: 'From F=ma, a is inversely proportional to m',
        }),
        tags: 'forces,proportions',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'The SI unit of force is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Newton (N)',
          wrongAnswers: ['Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          explanation: 'Force is measured in Newtons',
        }),
        tags: 'forces,units',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Friction always acts:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Opposite to the direction of motion',
          wrongAnswers: ['In the direction of motion', 'Perpendicular to motion', 'Downwards only'],
          explanation: 'Friction opposes motion',
        }),
        tags: 'forces,friction',
        estimatedTime: 75,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate weight on Earth: mass = {m}kg (g = 10 m/s²)',
        variables: JSON.stringify({ m: { min: 5, max: 50, step: 5 } }),
        solution: JSON.stringify({
          formula: 'm * 10',
          explanation: 'Weight = mass × g',
        }),
        tags: 'forces,weight',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which is a vector quantity?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Velocity',
          wrongAnswers: ['Speed', 'Mass', 'Distance'],
          explanation: 'Vectors have magnitude and direction',
        }),
        tags: 'forces,vectors',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Newton\'s Third Law: For every action there is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'An equal and opposite reaction',
          wrongAnswers: ['A greater reaction', 'A smaller reaction', 'No reaction'],
          explanation: 'Action-reaction pairs are equal and opposite',
        }),
        tags: 'forces,newtons-third-law',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What is the difference between mass and weight?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Mass is amount of matter, weight is gravitational force',
          wrongAnswers: ['They are the same', 'Mass changes with location', 'Weight is measured in kg'],
          explanation: 'Mass is constant, weight varies with gravity',
        }),
        tags: 'forces,mass-weight',
        estimatedTime: 90,
      },
    ]);

    // ENERGY & POWER
    addProblems('Energy & Power', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'The SI unit of energy is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Joule (J)',
          wrongAnswers: ['Watt (W)', 'Newton (N)', 'Volt (V)'],
          explanation: 'Energy is measured in Joules',
        }),
        tags: 'energy,units',
        estimatedTime: 60,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate kinetic energy: mass = {m}kg, velocity = {v}m/s (KE = ½mv²)',
        variables: JSON.stringify({ m: { min: 2, max: 10, step: 2 }, v: { min: 4, max: 12, step: 2 } }),
        solution: JSON.stringify({
          formula: '0.5 * m * v * v',
          explanation: 'KE = ½mv²',
        }),
        tags: 'energy,kinetic',
        estimatedTime: 120,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate potential energy: mass = {m}kg, height = {h}m (g = 10 m/s²)',
        variables: JSON.stringify({ m: { min: 5, max: 20, step: 5 }, h: { min: 3, max: 15, step: 3 } }),
        solution: JSON.stringify({
          formula: 'm * 10 * h',
          explanation: 'PE = mgh',
        }),
        tags: 'energy,potential',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'The Law of Conservation of Energy states:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Energy cannot be created or destroyed, only transferred',
          wrongAnswers: ['Energy always increases', 'Energy is lost as heat', 'Energy can be created from nothing'],
          explanation: 'Energy is conserved in all processes',
        }),
        tags: 'energy,conservation',
        estimatedTime: 75,
      },
      {
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Power = {W}W, time = {t}s. Calculate energy transferred.',
        variables: JSON.stringify({ W: { min: 100, max: 500, step: 100 }, t: { min: 5, max: 20, step: 5 } }),
        solution: JSON.stringify({
          formula: 'W * t',
          explanation: 'Energy = Power × time',
        }),
        tags: 'power,energy',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'The SI unit of power is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Watt (W)',
          wrongAnswers: ['Joule (J)', 'Newton (N)', 'Volt (V)'],
          explanation: 'Power is measured in Watts',
        }),
        tags: 'power,units',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Power is defined as:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Energy transferred per unit time',
          wrongAnswers: ['Total energy', 'Force × distance', 'Mass × velocity'],
          explanation: 'Power = Energy/time',
        }),
        tags: 'power,definition',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'At the top of a swing, energy is mainly:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Potential energy',
          wrongAnswers: ['Kinetic energy', 'Heat energy', 'Sound energy'],
          explanation: 'At maximum height, velocity is zero, so PE is maximum',
        }),
        tags: 'energy,transfers',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Efficiency is calculated as:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '(Useful energy output / Total energy input) × 100%',
          wrongAnswers: ['Total energy / Useful energy', 'Wasted energy / Total energy', 'Power × time'],
          explanation: 'Efficiency = (useful out / total in) × 100%',
        }),
        tags: 'energy,efficiency',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Work done is calculated as:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Force × distance moved in direction of force',
          wrongAnswers: ['Force × time', 'Mass × distance', 'Power × velocity'],
          explanation: 'Work = Force × distance',
        }),
        tags: 'work,energy',
        estimatedTime: 90,
      },
    ]);

    // HEAT TRANSFER
    addProblems('Heat Transfer', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which method of heat transfer does NOT require a medium?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Radiation',
          wrongAnswers: ['Conduction', 'Convection', 'All need a medium'],
          explanation: 'Radiation can occur through vacuum (like Sun to Earth)',
        }),
        tags: 'heat,radiation',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Heat transfer through direct contact is called:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Conduction',
          wrongAnswers: ['Convection', 'Radiation', 'Insulation'],
          explanation: 'Conduction occurs when particles collide',
        }),
        tags: 'heat,conduction',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Heat transfer in liquids and gases mainly occurs by:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Convection',
          wrongAnswers: ['Conduction', 'Radiation', 'Compression'],
          explanation: 'Convection currents form in fluids',
        }),
        tags: 'heat,convection',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Good conductors of heat are usually:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Metals',
          wrongAnswers: ['Plastics', 'Wood', 'Air'],
          explanation: 'Metals have free electrons for energy transfer',
        }),
        tags: 'heat,conductors',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Shiny surfaces are good at:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Reflecting radiation',
          wrongAnswers: ['Absorbing radiation', 'Conducting heat', 'Convection'],
          explanation: 'Shiny/light surfaces reflect thermal radiation',
        }),
        tags: 'heat,radiation,surfaces',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Dark, matt surfaces are good at:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Absorbing and emitting radiation',
          wrongAnswers: ['Reflecting radiation', 'Preventing convection', 'Insulating'],
          explanation: 'Dark surfaces absorb and emit radiation well',
        }),
        tags: 'heat,radiation,surfaces',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Insulators are materials that:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Reduce heat transfer',
          wrongAnswers: ['Conduct heat well', 'Increase heat transfer', 'Generate heat'],
          explanation: 'Insulators slow down heat flow',
        }),
        tags: 'heat,insulators',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'In a convection current, hot fluid:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Rises because it is less dense',
          wrongAnswers: ['Sinks because it is heavier', 'Stays still', 'Moves sideways only'],
          explanation: 'Hot fluid expands, becomes less dense, and rises',
        }),
        tags: 'heat,convection,density',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Trapped air is a good insulator because:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'It prevents convection and is a poor conductor',
          wrongAnswers: ['It conducts heat well', 'It is dense', 'It absorbs radiation'],
          explanation: 'Still air cannot transfer heat by convection',
        }),
        tags: 'heat,insulation,air',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Thermal radiation is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Electromagnetic waves (infrared)',
          wrongAnswers: ['Sound waves', 'Moving particles', 'Electrical current'],
          explanation: 'Heat radiation is infrared electromagnetic waves',
        }),
        tags: 'heat,radiation,waves',
        estimatedTime: 90,
      },
    ]);

    console.log(`Part 2: Creating ${problems.length} problems...`);
    await prisma.problem.createMany({ data: problems });

    return NextResponse.json({
      success: true,
      message: 'Part 2 complete: Logarithms, Calculus, Forces, Energy, Heat',
      problemsCreated: problems.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
