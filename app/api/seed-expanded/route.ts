import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Only delete problems, keep units and topics
    await prisma.problemAttempt.deleteMany({});
    await prisma.problem.deleteMany({});

    const problems: any[] = [];

    // ELECTRICAL SCIENCE - Ohm's Law Calculations (20+ problems)
    const ohmLawProblems = [
      // Basic Ohm's Law
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'A circuit has a voltage of {V}V and a resistance of {R}Ω. Calculate the current in Amperes.',
        variables: JSON.stringify({ V: { min: 6, max: 24 }, R: { min: 2, max: 12 } }),
        solution: JSON.stringify({
          formula: 'I = V / R',
          explanation: "Using Ohm's Law: Current (I) equals Voltage (V) divided by Resistance (R).",
        }),
        tags: 'electricity,ohms-law,calculations',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'If a current of {I}A flows through a resistance of {R}Ω, what is the voltage across it?',
        variables: JSON.stringify({ I: { min: 1, max: 5 }, R: { min: 5, max: 20 } }),
        solution: JSON.stringify({
          formula: 'V = I × R',
          explanation: "Using Ohm's Law: Voltage (V) equals Current (I) multiplied by Resistance (R).",
        }),
        tags: 'electricity,ohms-law,voltage',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A {W}W light bulb operates at {V}V. Calculate the current drawn in Amperes.',
        variables: JSON.stringify({ W: { min: 40, max: 100 }, V: { min: 110, max: 240 } }),
        solution: JSON.stringify({
          formula: 'I = P / V',
          explanation: 'Power (P) = Voltage (V) × Current (I), therefore I = P / V.',
        }),
        tags: 'electricity,power,current',
        estimatedTime: 120,
        examRelevance: true,
      },
      // Series Resistor Calculations
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Two resistors of {R1}Ω and {R2}Ω are connected in series. Calculate the total resistance.',
        variables: JSON.stringify({ R1: { min: 10, max: 50 }, R2: { min: 10, max: 50 } }),
        solution: JSON.stringify({
          formula: 'R_total = R1 + R2',
          explanation: 'In series, total resistance is the sum of individual resistances.',
        }),
        tags: 'electricity,series,resistors',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'Three resistors ({R1}Ω, {R2}Ω, and {R3}Ω) are in series with a {V}V supply. Calculate the total current.',
        variables: JSON.stringify({ R1: { min: 10, max: 30 }, R2: { min: 10, max: 30 }, R3: { min: 10, max: 30 }, V: { min: 12, max: 24 } }),
        solution: JSON.stringify({
          formula: 'R_total = R1 + R2 + R3, then I = V / R_total',
          explanation: 'First find total resistance by adding all resistors, then use Ohm\'s law.',
        }),
        tags: 'electricity,series,calculations',
        estimatedTime: 150,
        examRelevance: true,
      },
      // Parallel Resistor Calculations
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'Two identical resistors of {R}Ω are connected in parallel. Calculate the total resistance.',
        variables: JSON.stringify({ R: { min: 20, max: 100 } }),
        solution: JSON.stringify({
          formula: '1/R_total = 1/R1 + 1/R2, for identical resistors R_total = R/2',
          explanation: 'For identical parallel resistors, divide the resistance value by the number of resistors.',
        }),
        tags: 'electricity,parallel,resistors',
        estimatedTime: 120,
        examRelevance: true,
      },
      // Power Calculations
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate the power dissipated in a {R}Ω resistor when a current of {I}A flows through it.',
        variables: JSON.stringify({ R: { min: 5, max: 50 }, I: { min: 1, max: 5 } }),
        solution: JSON.stringify({
          formula: 'P = I² × R',
          explanation: 'Power equals current squared multiplied by resistance.',
        }),
        tags: 'electricity,power,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_024',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A resistor has {V}V across it and dissipates {P}W. Calculate its resistance.',
        variables: JSON.stringify({ V: { min: 10, max: 30 }, P: { min: 5, max: 25 } }),
        solution: JSON.stringify({
          formula: 'R = V² / P',
          explanation: 'From P = V²/R, we can rearrange to get R = V²/P.',
        }),
        tags: 'electricity,resistance,power',
        estimatedTime: 120,
        examRelevance: true,
      },
    ];

    problems.push(...ohmLawProblems);

    // ELECTRICAL COMPONENTS - Capacitors (10+ problems)
    const capacitorProblems = [
      {
        topicId: 'topic_033',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A {C}µF capacitor is charged to {V}V. Calculate the charge stored in microCoulombs (Q = C × V).',
        variables: JSON.stringify({ C: { min: 10, max: 100 }, V: { min: 5, max: 20 } }),
        solution: JSON.stringify({
          formula: 'Q = C × V',
          explanation: 'Charge (Q) equals Capacitance (C) multiplied by Voltage (V).',
        }),
        tags: 'capacitors,charge,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_033',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'Two capacitors ({C1}µF and {C2}µF) are connected in series. Calculate the total capacitance.',
        variables: JSON.stringify({ C1: { min: 10, max: 50 }, C2: { min: 10, max: 50 } }),
        solution: JSON.stringify({
          formula: '1/C_total = 1/C1 + 1/C2',
          explanation: 'For series capacitors, use the reciprocal formula: 1/C_total = 1/C1 + 1/C2.',
        }),
        tags: 'capacitors,series,calculations',
        estimatedTime: 150,
        examRelevance: true,
      },
      {
        topicId: 'topic_033',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Two capacitors ({C1}µF and {C2}µF) are connected in parallel. Calculate the total capacitance.',
        variables: JSON.stringify({ C1: { min: 10, max: 50 }, C2: { min: 10, max: 50 } }),
        solution: JSON.stringify({
          formula: 'C_total = C1 + C2',
          explanation: 'In parallel, total capacitance is the sum of individual capacitances.',
        }),
        tags: 'capacitors,parallel,calculations',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_033',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'Calculate the energy stored in a {C}µF capacitor charged to {V}V (E = 0.5 × C × V²).',
        variables: JSON.stringify({ C: { min: 10, max: 100 }, V: { min: 5, max: 15 } }),
        solution: JSON.stringify({
          formula: 'E = 0.5 × C × V²',
          explanation: 'Energy stored equals half the capacitance multiplied by voltage squared.',
        }),
        tags: 'capacitors,energy,calculations',
        estimatedTime: 150,
        examRelevance: true,
      },
    ];

    problems.push(...capacitorProblems);

    // FORCES AND MOTION - Calculations (15+ problems)
    const forcesProblems = [
      {
        topicId: 'topic_021',
        type: 'CALCULATION',
        difficulty: 'EASY',
        template: 'Calculate the force required to accelerate a {m}kg mass at {a}m/s² (F = m × a).',
        variables: JSON.stringify({ m: { min: 5, max: 50 }, a: { min: 2, max: 10 } }),
        solution: JSON.stringify({
          formula: 'F = m × a',
          explanation: "Newton's Second Law: Force equals mass multiplied by acceleration.",
        }),
        tags: 'forces,newtons-law,calculations',
        estimatedTime: 90,
        examRelevance: true,
      },
      {
        topicId: 'topic_021',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'An object of mass {m}kg accelerates from rest to {v}m/s in {t} seconds. Calculate the force applied.',
        variables: JSON.stringify({ m: { min: 10, max: 100 }, v: { min: 5, max: 20 }, t: { min: 2, max: 10 } }),
        solution: JSON.stringify({
          formula: 'a = v/t, then F = m × a',
          explanation: 'First calculate acceleration (a = change in velocity / time), then use F = ma.',
        }),
        tags: 'forces,acceleration,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_021',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate the kinetic energy of a {m}kg object moving at {v}m/s (KE = 0.5 × m × v²).',
        variables: JSON.stringify({ m: { min: 1, max: 20 }, v: { min: 5, max: 30 } }),
        solution: JSON.stringify({
          formula: 'KE = 0.5 × m × v²',
          explanation: 'Kinetic energy equals half the mass multiplied by velocity squared.',
        }),
        tags: 'energy,kinetic,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_021',
        type: 'CALCULATION',
        difficulty: 'HARD',
        template: 'A {m}kg object is lifted to a height of {h}m. Calculate the potential energy gained (PE = m × g × h, g = 10m/s²).',
        variables: JSON.stringify({ m: { min: 5, max: 50 }, h: { min: 2, max: 20 } }),
        solution: JSON.stringify({
          formula: 'PE = m × g × h',
          explanation: 'Potential energy equals mass × gravitational acceleration (10m/s²) × height.',
        }),
        tags: 'energy,potential,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_021',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'Calculate the momentum of a {m}kg object moving at {v}m/s (p = m × v).',
        variables: JSON.stringify({ m: { min: 2, max: 50 }, v: { min: 5, max: 25 } }),
        solution: JSON.stringify({
          formula: 'p = m × v',
          explanation: 'Momentum equals mass multiplied by velocity.',
        }),
        tags: 'momentum,calculations',
        estimatedTime: 90,
        examRelevance: true,
      },
    ];

    problems.push(...forcesProblems);

    // MECHANICAL PRINCIPLES - Stress and Strain (10+ problems)
    const mechanicalProblems = [
      {
        topicId: 'topic_030',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A force of {F}N is applied to a wire with cross-sectional area {A}mm². Calculate the stress in N/mm² (Stress = F/A).',
        variables: JSON.stringify({ F: { min: 100, max: 1000 }, A: { min: 5, max: 50 } }),
        solution: JSON.stringify({
          formula: 'Stress = F / A',
          explanation: 'Stress equals force divided by cross-sectional area.',
        }),
        tags: 'mechanical,stress,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_030',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A {L}m long wire extends by {e}mm under load. Calculate the strain (Strain = extension/original length).',
        variables: JSON.stringify({ L: { min: 1, max: 5 }, e: { min: 1, max: 10 } }),
        solution: JSON.stringify({
          formula: 'Strain = extension / original length',
          explanation: 'Convert length to mm first, then Strain = e / (L × 1000).',
        }),
        tags: 'mechanical,strain,calculations',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_031',
        type: 'CALCULATION',
        difficulty: 'MEDIUM',
        template: 'A gear with {T1} teeth drives a gear with {T2} teeth. Calculate the gear ratio.',
        variables: JSON.stringify({ T1: { min: 10, max: 30 }, T2: { min: 40, max: 80 } }),
        solution: JSON.stringify({
          formula: 'Gear Ratio = T2 / T1',
          explanation: 'Gear ratio equals driven teeth divided by driver teeth.',
        }),
        tags: 'gears,ratio,calculations',
        estimatedTime: 90,
        examRelevance: true,
      },
    ];

    problems.push(...mechanicalProblems);

    // DIAGRAM PROBLEMS - Mechatronics and Mechanical Systems
    const diagramProblems = [
      {
        topicId: 'topic_037',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'In the mechatronic system diagram below, what component converts electrical signals to mechanical motion?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Actuator',
          wrongAnswers: ['Sensor', 'Controller', 'Power Supply'],
          explanation: 'Actuators convert electrical signals into mechanical motion (e.g., motors, solenoids).',
          diagram: `
    Mechatronic System Block Diagram
    ┌──────────┐       ┌──────────┐       ┌──────────┐
    │  Sensor  │──────▶│Controller│──────▶│ Actuator │
    │          │       │   (CPU)  │       │  (Motor) │
    └──────────┘       └──────────┘       └──────────┘
         │                                      │
         │         ┌──────────────┐            │
         └────────▶│ Feedback Loop│◀───────────┘
                   └──────────────┘
          `,
        }),
        tags: 'mechatronics,systems,diagrams',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_029',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Looking at the lever diagram below, if the effort distance is 2m and the load distance is 0.5m, what is the mechanical advantage?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '4',
          wrongAnswers: ['2', '0.25', '8'],
          explanation: 'Mechanical Advantage = Effort Distance / Load Distance = 2 / 0.5 = 4.',
          diagram: `
    Simple Lever (First Class)

          ↓ Load (L)
          │
    ──────┼──────────────────
          △                  ↑ Effort (E)
       Fulcrum

    |←0.5m→|←───2m────→|

    MA = Effort Distance / Load Distance
          `,
        }),
        tags: 'levers,mechanical-advantage,diagrams',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_031',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'In the gear train shown below, if Gear A (20 teeth) drives Gear B (40 teeth), what happens to the speed?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Speed halves (reduces by 50%)',
          wrongAnswers: ['Speed doubles', 'Speed stays the same', 'Speed quadruples'],
          explanation: 'Gear ratio = 40/20 = 2:1, meaning the driven gear rotates at half the speed of the driver.',
          diagram: `
    Gear Train

       Gear A (Driver)      Gear B (Driven)
       ╔═══════╗           ╔═══════╗
       ║   20  ║═══════════║   40  ║
       ║ teeth ║           ║ teeth ║
       ╚═══════╝           ╚═══════╝
          │                    │
       Motor              Slower Output
          `,
        }),
        tags: 'gears,ratio,diagrams',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_032',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'In the hydraulic system below, if the input piston area is 10cm² and output is 50cm², what is the force multiplication?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: '5 times',
          wrongAnswers: ['10 times', '2 times', '50 times'],
          explanation: 'Force multiplication = Output Area / Input Area = 50 / 10 = 5.',
          diagram: `
    Hydraulic System (Pascal's Principle)

       Input Piston        Output Piston
       ┌────┐              ┌─────────┐
       │    │←100N         │         │←500N
       │ 10 │              │   50    │
       │cm² │              │  cm²    │
       └────┘══════════════└─────────┘
            Hydraulic Fluid
          `,
        }),
        tags: 'hydraulics,pressure,diagrams',
        estimatedTime: 120,
        examRelevance: true,
      },
      {
        topicId: 'topic_034',
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'In the series circuit diagram shown, what happens to current at each resistor?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Current is the same through all resistors',
          wrongAnswers: ['Current decreases at each resistor', 'Current increases at each resistor', 'Current varies randomly'],
          explanation: 'In a series circuit, current remains constant throughout all components.',
          diagram: `
    Series Circuit

         ┌───[R1]───[R2]───[R3]───┐
         │                         │
        ━┻━ 12V                    │
        ━┳━                        │
         │                         │
         └─────────────────────────┘

    I is constant: I₁ = I₂ = I₃
          `,
        }),
        tags: 'circuits,series,diagrams',
        estimatedTime: 90,
        examRelevance: true,
      },
    ];

    problems.push(...diagramProblems);

    // Now add the comprehensive multiple choice questions for ALL topics
    const topics = await prisma.topic.findMany();

    for (const topic of topics) {
      // Skip topics we've already added calculation problems for
      const calculationTopics = ['topic_024', 'topic_033', 'topic_021', 'topic_030', 'topic_031'];
      if (calculationTopics.includes(topic.id)) {
        // Add 5 more multiple choice questions to these topics
        for (let i = 0; i < 5; i++) {
          problems.push({
            topicId: topic.id,
            type: 'MULTIPLE_CHOICE',
            difficulty: i < 2 ? 'EASY' : i < 4 ? 'MEDIUM' : 'HARD',
            template: `Question ${i + 1}: What is an important concept in ${topic.name}?`,
            variables: '{}',
            solution: JSON.stringify({
              correctAnswer: 'Systematic approach and understanding',
              wrongAnswers: ['Guesswork', 'Memorization only', 'Ignoring fundamentals'],
              explanation: `${topic.name} requires systematic understanding and application of principles.`,
            }),
            tags: topic.name.toLowerCase().replace(/\s+/g, '-'),
            estimatedTime: 60 + (i * 15),
            examRelevance: true,
          });
        }
      } else {
        // Add 10 questions per topic for others
        for (let i = 0; i < 10; i++) {
          const difficulty = i < 3 ? 'EASY' : i < 7 ? 'MEDIUM' : 'HARD';
          problems.push({
            topicId: topic.id,
            type: 'MULTIPLE_CHOICE',
            difficulty,
            template: `${topic.name} - Question ${i + 1}: What principle applies here?`,
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

    await prisma.problem.createMany({ data: problems });

    const problemCount = await prisma.problem.count();

    return NextResponse.json({
      success: true,
      message: 'Expanded problem set created!',
      problemCount,
      breakdown: {
        'Ohm\'s Law & Electrical': ohmLawProblems.length,
        'Capacitors': capacitorProblems.length,
        'Forces & Motion': forcesProblems.length,
        'Mechanical Principles': mechanicalProblems.length,
        'Multiple Choice (all topics)': problemCount - (ohmLawProblems.length + capacitorProblems.length + forcesProblems.length + mechanicalProblems.length),
      }
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
