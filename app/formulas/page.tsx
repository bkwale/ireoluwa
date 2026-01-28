'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FormulasPage() {
  const router = useRouter();

  const formulas = [
    {
      category: 'Forces and Motion',
      items: [
        { name: "Newton's Second Law", formula: 'F = m × a', description: 'Force = mass × acceleration' },
        { name: 'Weight', formula: 'W = m × g', description: 'Weight = mass × gravitational acceleration (g = 10 m/s²)' },
        { name: 'Velocity', formula: 'v = u + at', description: 'Final velocity = initial velocity + acceleration × time' },
        { name: 'Distance', formula: 's = ut + ½at²', description: 'Distance = initial velocity × time + ½ × acceleration × time²' },
        { name: 'Kinetic Energy', formula: 'KE = ½mv²', description: 'Kinetic energy = ½ × mass × velocity²' },
        { name: 'Potential Energy', formula: 'PE = mgh', description: 'Potential energy = mass × gravity × height' },
        { name: 'Work Done', formula: 'W = F × d', description: 'Work = force × distance' },
        { name: 'Power', formula: 'P = W/t', description: 'Power = work / time' },
        { name: 'Momentum', formula: 'p = m × v', description: 'Momentum = mass × velocity' },
      ]
    },
    {
      category: 'Electrical Science',
      items: [
        { name: "Ohm's Law", formula: 'V = I × R', description: 'Voltage = current × resistance' },
        { name: 'Power (electrical)', formula: 'P = V × I', description: 'Power = voltage × current' },
        { name: 'Power (alternative 1)', formula: 'P = I² × R', description: 'Power = current² × resistance' },
        { name: 'Power (alternative 2)', formula: 'P = V² / R', description: 'Power = voltage² / resistance' },
        { name: 'Series Resistors', formula: 'R_total = R₁ + R₂ + R₃...', description: 'Total resistance = sum of resistances' },
        { name: 'Parallel Resistors', formula: '1/R_total = 1/R₁ + 1/R₂...', description: 'Reciprocal of total = sum of reciprocals' },
        { name: 'Charge', formula: 'Q = I × t', description: 'Charge = current × time' },
        { name: 'Energy (electrical)', formula: 'E = V × Q', description: 'Energy = voltage × charge' },
      ]
    },
    {
      category: 'Capacitors',
      items: [
        { name: 'Charge on Capacitor', formula: 'Q = C × V', description: 'Charge = capacitance × voltage' },
        { name: 'Energy Stored', formula: 'E = ½CV²', description: 'Energy = ½ × capacitance × voltage²' },
        { name: 'Series Capacitors', formula: '1/C_total = 1/C₁ + 1/C₂...', description: 'Reciprocal formula (opposite of resistors)' },
        { name: 'Parallel Capacitors', formula: 'C_total = C₁ + C₂ + C₃...', description: 'Total capacitance = sum (opposite of resistors)' },
      ]
    },
    {
      category: 'Mechanical Principles',
      items: [
        { name: 'Stress', formula: 'σ = F / A', description: 'Stress = force / area' },
        { name: 'Strain', formula: 'ε = ΔL / L', description: 'Strain = change in length / original length' },
        { name: "Young's Modulus", formula: 'E = σ / ε', description: 'Modulus = stress / strain' },
        { name: 'Mechanical Advantage', formula: 'MA = Load / Effort', description: 'Also = effort distance / load distance' },
        { name: 'Velocity Ratio', formula: 'VR = distance moved by effort / distance moved by load', description: 'For machines' },
        { name: 'Efficiency', formula: 'η = (MA / VR) × 100%', description: 'Efficiency = (MA / VR) × 100%' },
        { name: 'Gear Ratio', formula: 'GR = driven teeth / driver teeth', description: 'Also equals speed ratio (inverse)' },
        { name: 'Torque', formula: 'T = F × d', description: 'Torque = force × perpendicular distance' },
        { name: 'Pressure (hydraulic)', formula: 'P = F / A', description: 'Pressure = force / area' },
        { name: 'Moment', formula: 'M = F × d', description: 'Moment = force × perpendicular distance' },
      ]
    },
    {
      category: 'Thermodynamics',
      items: [
        { name: 'Heat Energy', formula: 'Q = mcΔT', description: 'Heat = mass × specific heat × temperature change' },
        { name: 'Efficiency (heat engine)', formula: 'η = (W_out / Q_in) × 100%', description: 'Efficiency = (work out / heat in) × 100%' },
        { name: 'Pressure-Volume Work', formula: 'W = P × ΔV', description: 'Work = pressure × change in volume' },
      ]
    },
    {
      category: 'Mathematics',
      items: [
        { name: 'Area of Circle', formula: 'A = πr²', description: 'Area = π × radius²' },
        { name: 'Circumference', formula: 'C = 2πr', description: 'Circumference = 2 × π × radius' },
        { name: 'Volume of Cylinder', formula: 'V = πr²h', description: 'Volume = π × radius² × height' },
        { name: 'Pythagoras', formula: 'a² + b² = c²', description: 'In right triangle: hypotenuse² = side₁² + side₂²' },
        { name: 'Sine Rule', formula: 'sin(θ) = opposite / hypotenuse', description: 'SOHCAHTOA' },
        { name: 'Cosine Rule', formula: 'cos(θ) = adjacent / hypotenuse', description: 'SOHCAHTOA' },
        { name: 'Tangent Rule', formula: 'tan(θ) = opposite / adjacent', description: 'SOHCAHTOA' },
        { name: 'Quadratic Formula', formula: 'x = [-b ± √(b² - 4ac)] / 2a', description: 'For ax² + bx + c = 0' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Formula Reference Sheet</h1>
            <p className="text-sm text-blue-100 mt-1">Quick reference for T-Level Engineering</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-white font-semibold"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {formulas.map((category, idx) => (
            <Card key={idx} className="border-2">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-gray-900">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="font-mono text-lg text-blue-700 my-1 bg-blue-50 px-2 py-1 rounded inline-block">
                        {item.formula}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-2 border-yellow-300 bg-yellow-50">
          <CardContent className="pt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-2">📝 Exam Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Always write the formula first before substituting values</li>
              <li>Show all your working - you get marks for method even if the answer is wrong</li>
              <li>Check your units - convert if necessary (mm to m, kW to W, etc.)</li>
              <li>Use g = 10 m/s² unless told otherwise</li>
              <li>Round final answers to 2 decimal places unless specified</li>
              <li>Double-check the question asks for (e.g., current in Amps, not milliamps)</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
