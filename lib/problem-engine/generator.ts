export interface GeneratedProblem {
  problemId: string;
  question: string;
  variables: Record<string, number>;
  correctAnswer: number;
  steps: SolutionStep[];
  difficulty: string;
  estimatedTime: number;
}

export interface SolutionStep {
  stepNumber: number;
  instruction: string;
  formula?: string;
  calculation?: string;
  result: string;
}

export function generateProblem(problem: any): GeneratedProblem {
  const template = JSON.parse(problem.template);
  const variableRanges = JSON.parse(problem.variables);
  const solution = JSON.parse(problem.solution);

  // Generate random values for variables
  const generatedVariables: Record<string, number> = {};
  for (const [key, range] of Object.entries(variableRanges) as [string, any][]) {
    const min = range.min;
    const max = range.max;
    const step = range.step || 1;
    const steps = Math.floor((max - min) / step) + 1;
    const randomStep = Math.floor(Math.random() * steps);
    generatedVariables[key] = min + randomStep * step;
  }

  // Replace variables in question
  let question = template.question;
  for (const [key, value] of Object.entries(generatedVariables)) {
    question = question.replace(new RegExp(`\\{${key}\\}`, 'g'), value.toString());
  }

  // Calculate correct answer
  const correctAnswer = calculateAnswer(solution.answer, generatedVariables);

  // Generate solution steps
  const steps: SolutionStep[] = solution.steps.map((step: string, index: number) => {
    let instruction = step;
    let calculation = '';

    // Replace variables in instruction
    for (const [key, value] of Object.entries(generatedVariables)) {
      instruction = instruction.replace(new RegExp(`\\{${key}\\}`, 'g'), value.toString());
    }

    return {
      stepNumber: index + 1,
      instruction,
      formula: solution.formula,
      calculation,
      result: index === solution.steps.length - 1 ? correctAnswer.toFixed(2) : '',
    };
  });

  return {
    problemId: problem.id,
    question,
    variables: generatedVariables,
    correctAnswer,
    steps,
    difficulty: problem.difficulty,
    estimatedTime: problem.estimatedTime,
  };
}

function calculateAnswer(answerFormula: string, variables: Record<string, number>): number {
  // Replace variables in formula
  let formula = answerFormula;
  for (const [key, value] of Object.entries(variables)) {
    formula = formula.replace(new RegExp(`\\{${key}\\}`, 'g'), value.toString());
  }

  // Evaluate based on the formula type
  try {
    // Handle sin, cos, tan functions (convert degrees to radians)
    formula = formula.replace(/sin\((\d+(\.\d+)?)\)/g, (match, degrees) => {
      const radians = (parseFloat(degrees) * Math.PI) / 180;
      return Math.sin(radians).toString();
    });

    formula = formula.replace(/cos\((\d+(\.\d+)?)\)/g, (match, degrees) => {
      const radians = (parseFloat(degrees) * Math.PI) / 180;
      return Math.cos(radians).toString();
    });

    formula = formula.replace(/tan\((\d+(\.\d+)?)\)/g, (match, degrees) => {
      const radians = (parseFloat(degrees) * Math.PI) / 180;
      return Math.tan(radians).toString();
    });

    // Handle basic arithmetic with eval (safe in this controlled context)
    // In production, use a proper math parser library
    const result = eval(formula);
    return parseFloat(result);
  } catch (error) {
    console.error('Error calculating answer:', error);
    return 0;
  }
}

export function checkAnswer(userAnswer: number, correctAnswer: number, tolerance: number = 0.01): boolean {
  return Math.abs(userAnswer - correctAnswer) <= tolerance;
}
