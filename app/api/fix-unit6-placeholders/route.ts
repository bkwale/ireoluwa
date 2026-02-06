import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * FIX UNIT 6 PLACEHOLDERS - Replace all 70 placeholder questions with REAL educational content
 * Topics: Polymers, Ceramics, Composites, Mechanical Properties, Thermal Properties, Electrical Properties, Corrosion
 */
export async function GET() {
  try {
    // Delete ONLY the 7 topics with placeholders
    const placeholderTopics = [
      'Polymers', 'Ceramics', 'Composites', 'Mechanical Properties',
      'Thermal Properties', 'Electrical Properties', 'Corrosion'
    ];

    const allTopics = await prisma.topic.findMany({
      where: { name: { in: placeholderTopics } }
    });

    const topicIds = allTopics.map(t => t.id);

    const deleted = await prisma.problem.deleteMany({
      where: { topicId: { in: topicIds } }
    });

    console.log(`Deleted ${deleted.count} placeholder questions`);

    const problems: any[] = [];

    const addProblems = (topicName: string, questionArray: any[]) => {
      const topic = allTopics.find(t => t.name === topicName);
      if (topic) {
        questionArray.forEach(q => {
          problems.push({ ...q, topicId: topic.id, examRelevance: true });
        });
      }
    };

    // POLYMERS - 10 real questions
    addProblems('Polymers', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'What are polymers made from?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Long chains of repeating molecular units (monomers)',
          wrongAnswers: ['Single atoms', 'Metal alloys', 'Ceramic compounds'],
          explanation: 'Polymers are made by linking many monomers together',
        }),
        tags: 'polymers,structure',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which is an example of a thermoplastic?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Polyethylene (plastic bags)',
          wrongAnswers: ['Epoxy resin', 'Vulcanized rubber', 'Bakelite'],
          explanation: 'Thermoplastics can be melted and reshaped',
        }),
        tags: 'polymers,thermoplastic',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Thermosetting plastics, once set, cannot be:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Melted and reshaped',
          wrongAnswers: ['Painted', 'Cut', 'Drilled'],
          explanation: 'Thermosets have permanent cross-links',
        }),
        tags: 'polymers,thermoset',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'PVC stands for:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Polyvinyl Chloride',
          wrongAnswers: ['Plastic Vinyl Composite', 'Pure Vinyl Carbon', 'Polymer Vinyl Coating'],
          explanation: 'PVC is used for pipes and window frames',
        }),
        tags: 'polymers,pvc',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'What property makes rubber useful for tyres?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Elasticity (can stretch and return to shape)',
          wrongAnswers: ['High melting point', 'Electrical conductivity', 'Transparency'],
          explanation: 'Rubber is elastic due to coiled polymer chains',
        }),
        tags: 'polymers,elasticity',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Polymerization is the process of:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Joining monomers to form long polymer chains',
          wrongAnswers: ['Breaking polymers into monomers', 'Melting plastics', 'Recycling polymers'],
          explanation: 'Addition or condensation polymerization creates polymers',
        }),
        tags: 'polymers,polymerization',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which polymer is biodegradable?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'PLA (Polylactic Acid)',
          wrongAnswers: ['PVC', 'Polystyrene', 'Polypropylene'],
          explanation: 'PLA breaks down naturally, used for compostable packaging',
        }),
        tags: 'polymers,biodegradable',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Plastics are generally:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Good electrical insulators',
          wrongAnswers: ['Good electrical conductors', 'Magnetic', 'Always transparent'],
          explanation: 'Most polymers do not conduct electricity',
        }),
        tags: 'polymers,properties',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Vulcanization of rubber involves:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Adding sulfur to create cross-links',
          wrongAnswers: ['Melting and cooling', 'Adding plasticizers', 'UV exposure'],
          explanation: 'Sulfur cross-links make rubber stronger and more elastic',
        }),
        tags: 'polymers,vulcanization',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which property is NOT typical of polymers?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'High electrical conductivity',
          wrongAnswers: ['Low density', 'Flexibility', 'Resistance to corrosion'],
          explanation: 'Polymers are insulators, not conductors',
        }),
        tags: 'polymers,properties',
        estimatedTime: 90,
      },
    ]);

    // CERAMICS - 10 real questions
    addProblems('Ceramics', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Ceramics are made from:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Non-metallic inorganic materials (clay, oxides)',
          wrongAnswers: ['Metals', 'Polymers', 'Organic compounds'],
          explanation: 'Ceramics include pottery, bricks, glass, porcelain',
        }),
        tags: 'ceramics,composition',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'A key property of ceramics is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'High hardness and wear resistance',
          wrongAnswers: ['High ductility', 'High electrical conductivity', 'Low melting point'],
          explanation: 'Ceramics are hard but brittle',
        }),
        tags: 'ceramics,properties',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Ceramics are brittle, which means they:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Break suddenly without deforming',
          wrongAnswers: ['Bend easily', 'Stretch before breaking', 'Conduct electricity'],
          explanation: 'Ceramics fracture rather than bend under stress',
        }),
        tags: 'ceramics,brittleness',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which is an example of a ceramic?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Porcelain',
          wrongAnswers: ['Steel', 'Polyethylene', 'Aluminum'],
          explanation: 'Porcelain is a ceramic used for tiles and tableware',
        }),
        tags: 'ceramics,examples',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Ceramics are good:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Thermal insulators',
          wrongAnswers: ['Thermal conductors', 'Electrical conductors', 'Ductile materials'],
          explanation: 'Most ceramics resist heat transfer',
        }),
        tags: 'ceramics,insulation',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Which ceramic is used in cutting tools due to extreme hardness?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Tungsten carbide',
          wrongAnswers: ['Clay', 'Porcelain', 'Glass'],
          explanation: 'Tungsten carbide is extremely hard, used for drill bits',
        }),
        tags: 'ceramics,cutting-tools',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Glass is a type of:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Ceramic',
          wrongAnswers: ['Metal', 'Polymer', 'Composite'],
          explanation: 'Glass is an amorphous ceramic',
        }),
        tags: 'ceramics,glass',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Firing clay at high temperature causes:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Permanent hardening through sintering',
          wrongAnswers: ['Melting', 'Softening', 'Increased flexibility'],
          explanation: 'Heat fuses particles together permanently',
        }),
        tags: 'ceramics,firing',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Advanced ceramics are used in:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Aerospace heat shields and electronics',
          wrongAnswers: ['Only pottery', 'Only bricks', 'Only windows'],
          explanation: 'Advanced ceramics have specialized high-tech applications',
        }),
        tags: 'ceramics,advanced',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Why are ceramics resistant to corrosion?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'They are already oxidized and chemically stable',
          wrongAnswers: ['They contain protective coatings', 'They repel water', 'They are metallic'],
          explanation: 'Ceramics are oxide compounds that won\'t corrode further',
        }),
        tags: 'ceramics,corrosion',
        estimatedTime: 90,
      },
    ]);

    // COMPOSITES - 10 real questions
    addProblems('Composites', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'A composite material is made from:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Two or more different materials combined',
          wrongAnswers: ['Only one material', 'Only metals', 'Only polymers'],
          explanation: 'Composites combine materials to get better properties',
        }),
        tags: 'composites,definition',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'In a composite, the matrix holds the:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Reinforcement fibers together',
          wrongAnswers: ['Metal particles', 'Air bubbles', 'Paint'],
          explanation: 'Matrix binds and protects reinforcement',
        }),
        tags: 'composites,matrix',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Fiberglass (GRP) is made from:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Glass fibers in a polymer resin matrix',
          wrongAnswers: ['Metal fibers in glass', 'Pure glass', 'Pure plastic'],
          explanation: 'GRP = Glass Reinforced Polymer/Plastic',
        }),
        tags: 'composites,fiberglass',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Carbon fiber composites are known for:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'High strength and low weight',
          wrongAnswers: ['Low cost', 'Easy recycling', 'High flexibility'],
          explanation: 'Used in racing cars, aircraft, sports equipment',
        }),
        tags: 'composites,carbon-fiber',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'The reinforcement in a composite provides:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Strength and stiffness',
          wrongAnswers: ['Color', 'Low cost', 'Electrical conductivity'],
          explanation: 'Fibers carry the load, matrix transfers stress',
        }),
        tags: 'composites,reinforcement',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Which is NOT a common composite?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Pure aluminum',
          wrongAnswers: ['Concrete (cement + aggregate)', 'Plywood (wood layers)', 'Carbon fiber'],
          explanation: 'Pure metals are not composites',
        }),
        tags: 'composites,examples',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Concrete is a composite of:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Cement, sand, and aggregate (stones)',
          wrongAnswers: ['Only cement', 'Only sand', 'Metal and plastic'],
          explanation: 'Cement is the matrix, aggregate is reinforcement',
        }),
        tags: 'composites,concrete',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Advantages of composites include:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'High strength-to-weight ratio',
          wrongAnswers: ['Always cheap', 'Easy to repair', 'Always recyclable'],
          explanation: 'Composites are strong but lightweight',
        }),
        tags: 'composites,advantages',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Kevlar composite is used for:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Bulletproof vests (high impact resistance)',
          wrongAnswers: ['Window glass', 'Electrical wiring', 'Food packaging'],
          explanation: 'Kevlar has exceptional strength and toughness',
        }),
        tags: 'composites,kevlar',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'A disadvantage of composites is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Difficult to recycle',
          wrongAnswers: ['Always weak', 'Always heavy', 'Always transparent'],
          explanation: 'Mixed materials are hard to separate for recycling',
        }),
        tags: 'composites,disadvantages',
        estimatedTime: 90,
      },
    ]);

    // MECHANICAL PROPERTIES - 10 real questions
    addProblems('Mechanical Properties', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Strength is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Withstand force without breaking',
          wrongAnswers: ['Conduct electricity', 'Resist corrosion', 'Float in water'],
          explanation: 'Tensile, compressive, and shear strength',
        }),
        tags: 'mechanical,strength',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Hardness is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Resist scratching and wear',
          wrongAnswers: ['Bend without breaking', 'Conduct heat', 'Be drawn into wires'],
          explanation: 'Diamond is the hardest natural material',
        }),
        tags: 'mechanical,hardness',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Ductility is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Be stretched into wires without breaking',
          wrongAnswers: ['Resist scratching', 'Return to original shape', 'Conduct electricity'],
          explanation: 'Copper is highly ductile - used for electrical wires',
        }),
        tags: 'mechanical,ductility',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Malleability is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Be hammered into thin sheets',
          wrongAnswers: ['Be stretched into wires', 'Resist corrosion', 'Conduct heat'],
          explanation: 'Gold is very malleable - can be beaten into gold leaf',
        }),
        tags: 'mechanical,malleability',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Toughness is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Absorb energy before breaking (resist impact)',
          wrongAnswers: ['Resist scratching', 'Be very hard', 'Conduct electricity'],
          explanation: 'Tough materials don\'t shatter easily - e.g., rubber',
        }),
        tags: 'mechanical,toughness',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Brittle materials:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Break suddenly without bending',
          wrongAnswers: ['Stretch a lot before breaking', 'Are very soft', 'Never break'],
          explanation: 'Glass and ceramics are brittle',
        }),
        tags: 'mechanical,brittleness',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Elasticity is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Return to original shape after deformation',
          wrongAnswers: ['Permanently deform', 'Resist scratching', 'Conduct heat'],
          explanation: 'Rubber and springs are elastic',
        }),
        tags: 'mechanical,elasticity',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Yield strength is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'The stress at which permanent deformation begins',
          wrongAnswers: ['The maximum stress before breaking', 'The hardness value', 'The melting point'],
          explanation: 'Beyond yield point, material won\'t return to original shape',
        }),
        tags: 'mechanical,yield',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which property describes resistance to permanent deformation?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Stiffness',
          wrongAnswers: ['Ductility', 'Malleability', 'Conductivity'],
          explanation: 'Stiff materials resist bending - high elastic modulus',
        }),
        tags: 'mechanical,stiffness',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Tensile strength measures resistance to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Being pulled apart',
          wrongAnswers: ['Being compressed', 'Being scratched', 'Being heated'],
          explanation: 'Tensile = tension/stretching force',
        }),
        tags: 'mechanical,tensile',
        estimatedTime: 75,
      },
    ]);

    // THERMAL PROPERTIES - 10 real questions
    addProblems('Thermal Properties', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Thermal conductivity is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Transfer heat',
          wrongAnswers: ['Resist heat', 'Generate heat', 'Reflect heat'],
          explanation: 'Metals are good thermal conductors',
        }),
        tags: 'thermal,conductivity',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which material is a good thermal insulator?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Polystyrene foam',
          wrongAnswers: ['Copper', 'Aluminum', 'Steel'],
          explanation: 'Insulators have low thermal conductivity',
        }),
        tags: 'thermal,insulation',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Thermal expansion is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Materials getting larger when heated',
          wrongAnswers: ['Materials getting smaller when heated', 'Heat generation', 'Heat resistance'],
          explanation: 'Most materials expand when temperature increases',
        }),
        tags: 'thermal,expansion',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Metals generally have:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'High thermal conductivity',
          wrongAnswers: ['Low thermal conductivity', 'No thermal conductivity', 'Negative thermal conductivity'],
          explanation: 'Metal cookware conducts heat well',
        }),
        tags: 'thermal,metals',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Specific heat capacity is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Energy needed to raise 1kg by 1°C',
          wrongAnswers: ['Maximum temperature material can reach', 'Rate of heat transfer', 'Thermal expansion rate'],
          explanation: 'Water has high specific heat capacity',
        }),
        tags: 'thermal,specific-heat',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Thermal shock resistance is important for materials that:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Experience rapid temperature changes',
          wrongAnswers: ['Are always at room temperature', 'Never conduct heat', 'Are always cold'],
          explanation: 'Borosilicate glass resists thermal shock',
        }),
        tags: 'thermal,shock',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Why do expansion joints exist in bridges?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'To allow for thermal expansion and contraction',
          wrongAnswers: ['To reduce cost', 'For decoration', 'To improve strength'],
          explanation: 'Prevents buckling from thermal expansion',
        }),
        tags: 'thermal,expansion-joints',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which has the highest thermal conductivity?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Copper',
          wrongAnswers: ['Wood', 'Plastic', 'Air'],
          explanation: 'Copper is an excellent heat conductor',
        }),
        tags: 'thermal,copper',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Thermal diffusivity relates to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'How quickly heat spreads through a material',
          wrongAnswers: ['Maximum temperature', 'Heat capacity', 'Expansion rate'],
          explanation: 'Diffusivity = conductivity / (density × specific heat)',
        }),
        tags: 'thermal,diffusivity',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Bimetallic strips work because:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Two metals expand at different rates when heated',
          wrongAnswers: ['Metals conduct electricity', 'Metals are magnetic', 'Metals are ductile'],
          explanation: 'Used in thermostats - strip bends with temperature',
        }),
        tags: 'thermal,bimetallic',
        estimatedTime: 90,
      },
    ]);

    // ELECTRICAL PROPERTIES - 10 real questions
    addProblems('Electrical Properties', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Electrical conductivity is the ability to:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Allow electric current to flow',
          wrongAnswers: ['Block electric current', 'Generate electricity', 'Store electricity'],
          explanation: 'Metals are good electrical conductors',
        }),
        tags: 'electrical,conductivity',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which is the best electrical conductor?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Silver',
          wrongAnswers: ['Wood', 'Plastic', 'Rubber'],
          explanation: 'Silver > Copper > Gold > Aluminum in conductivity',
        }),
        tags: 'electrical,conductors',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Electrical resistivity is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'The opposite of conductivity - resistance to current flow',
          wrongAnswers: ['The same as conductivity', 'The ability to store charge', 'The voltage'],
          explanation: 'High resistivity = poor conductor',
        }),
        tags: 'electrical,resistivity',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Insulators are materials that:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Do not conduct electricity',
          wrongAnswers: ['Conduct electricity well', 'Generate electricity', 'Store electricity permanently'],
          explanation: 'Plastic, rubber, glass are insulators',
        }),
        tags: 'electrical,insulators',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Semiconductors:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Conduct electricity better than insulators but worse than metals',
          wrongAnswers: ['Are perfect conductors', 'Are perfect insulators', 'Do not exist'],
          explanation: 'Silicon and germanium are semiconductors',
        }),
        tags: 'electrical,semiconductors',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Why do metals conduct electricity?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'They have free-moving electrons',
          wrongAnswers: ['They have no electrons', 'They generate electrons', 'They are magnetic'],
          explanation: 'Metallic bonding allows electrons to move freely',
        }),
        tags: 'electrical,metal-conduction',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Copper is commonly used for electrical wiring because it:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Has high conductivity and is ductile',
          wrongAnswers: ['Is the cheapest metal', 'Is magnetic', 'Is an insulator'],
          explanation: 'Good balance of conductivity, cost, and workability',
        }),
        tags: 'electrical,copper-wiring',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Which material is used to insulate electrical cables?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'PVC (plastic)',
          wrongAnswers: ['Copper', 'Aluminum', 'Steel'],
          explanation: 'Plastic insulation prevents electric shock',
        }),
        tags: 'electrical,cable-insulation',
        estimatedTime: 60,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Superconductors are materials that:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Have zero electrical resistance at very low temperatures',
          wrongAnswers: ['Have infinite resistance', 'Only work at high temperatures', 'Are always magnetic'],
          explanation: 'Used in MRI machines and particle accelerators',
        }),
        tags: 'electrical,superconductors',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Electrical resistance in a wire increases with:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Longer length and smaller cross-section',
          wrongAnswers: ['Shorter length and larger cross-section', 'Lower temperature', 'Higher voltage'],
          explanation: 'R = ρL/A (resistivity × length / area)',
        }),
        tags: 'electrical,resistance',
        estimatedTime: 90,
      },
    ]);

    // CORROSION - 10 real questions
    addProblems('Corrosion', [
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Corrosion is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Chemical deterioration of materials (especially metals)',
          wrongAnswers: ['Physical wear', 'Melting', 'Cutting'],
          explanation: 'Rusting of iron is the most common example',
        }),
        tags: 'corrosion,definition',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Rusting of iron requires:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Oxygen and water',
          wrongAnswers: ['Only oxygen', 'Only water', 'Only heat'],
          explanation: 'Iron + oxygen + water = rust (iron oxide)',
        }),
        tags: 'corrosion,rusting',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Which metal does NOT corrode easily?',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Gold',
          wrongAnswers: ['Iron', 'Zinc', 'Magnesium'],
          explanation: 'Gold is unreactive and doesn\'t oxidize',
        }),
        tags: 'corrosion,noble-metals',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Painting metal surfaces prevents corrosion by:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Creating a barrier from oxygen and water',
          wrongAnswers: ['Making the metal harder', 'Changing the metal structure', 'Heating the metal'],
          explanation: 'Paint acts as a protective coating',
        }),
        tags: 'corrosion,prevention',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Galvanizing is:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Coating iron/steel with zinc',
          wrongAnswers: ['Coating with paint', 'Heating to high temperature', 'Polishing the surface'],
          explanation: 'Zinc layer protects the iron underneath',
        }),
        tags: 'corrosion,galvanizing',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Sacrificial protection uses:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'A more reactive metal that corrodes instead',
          wrongAnswers: ['Paint', 'Plastic coating', 'Heat treatment'],
          explanation: 'Zinc or magnesium sacrifices itself to protect iron',
        }),
        tags: 'corrosion,sacrificial',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Stainless steel resists corrosion because it contains:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Chromium which forms a protective oxide layer',
          wrongAnswers: ['Gold', 'Plastic coating', 'No iron'],
          explanation: 'Minimum 10.5% chromium makes it "stainless"',
        }),
        tags: 'corrosion,stainless-steel',
        estimatedTime: 90,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'EASY',
        template: 'Aluminum forms a protective oxide layer that:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Prevents further corrosion',
          wrongAnswers: ['Makes it rust quickly', 'Makes it brittle', 'Makes it heavy'],
          explanation: 'Aluminum oxide layer is self-protecting',
        }),
        tags: 'corrosion,aluminum',
        estimatedTime: 75,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'HARD',
        template: 'Electrochemical corrosion occurs when:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Two different metals touch in the presence of an electrolyte',
          wrongAnswers: ['Metal is heated', 'Metal is painted', 'Metal is polished'],
          explanation: 'Forms a galvanic cell causing accelerated corrosion',
        }),
        tags: 'corrosion,electrochemical',
        estimatedTime: 120,
      },
      {
        type: 'MULTIPLE_CHOICE',
        difficulty: 'MEDIUM',
        template: 'Oil or grease prevents corrosion by:',
        variables: '{}',
        solution: JSON.stringify({
          correctAnswer: 'Keeping moisture away from metal surfaces',
          wrongAnswers: ['Changing the metal\'s structure', 'Making it harder', 'Conducting electricity'],
          explanation: 'Creates a water-repellent barrier',
        }),
        tags: 'corrosion,oil-protection',
        estimatedTime: 90,
      },
    ]);

    console.log(`Creating ${problems.length} REAL questions to replace placeholders...`);
    await prisma.problem.createMany({ data: problems });

    return NextResponse.json({
      success: true,
      message: '🎉 All Unit 6 placeholders REPLACED with real educational questions!',
      deleted: deleted.count,
      created: problems.length,
      topicsFixed: placeholderTopics,
    });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
