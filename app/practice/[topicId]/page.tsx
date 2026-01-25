'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GeneratedProblem {
  problemId: string;
  type: string;
  question: string;
  options?: string[];
  variables: Record<string, number>;
  correctAnswer: string | number;
  steps: any[];
  difficulty: string;
  estimatedTime: number;
  explanation?: string;
}

export default function PracticePage() {
  const router = useRouter();
  const params = useParams();
  const topicId = params.topicId as string;

  const [problem, setProblem] = useState<GeneratedProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    loadProblem();
  }, [topicId]);

  const loadProblem = async () => {
    try {
      setLoading(true);
      setShowResult(false);
      setUserAnswer('');
      setShowSteps(false);
      setStartTime(Date.now());

      const response = await fetch(`/api/problems/${topicId}`);
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to load problem');
      }

      const data = await response.json();
      setProblem(data.problem);
    } catch (error) {
      console.error('Error loading problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem || !userAnswer) return;

    setSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Check answer based on problem type
    let correct = false;
    if (problem.type === 'MULTIPLE_CHOICE') {
      correct = userAnswer === problem.correctAnswer;
    } else {
      const userNum = parseFloat(userAnswer);
      const correctNum = typeof problem.correctAnswer === 'number'
        ? problem.correctAnswer
        : parseFloat(problem.correctAnswer.toString());
      correct = Math.abs(userNum - correctNum) <= 0.01;
    }

    try {
      const response = await fetch('/api/problems/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.problemId,
          topicId,
          userAnswer,
          correctAnswer: problem.correctAnswer,
          timeSpent,
          variables: problem.variables,
        }),
      });

      const data = await response.json();
      setIsCorrect(data.isCorrect);
      setShowResult(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextProblem = () => {
    loadProblem();
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading problem...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">No problems available for this topic yet.</p>
            <Button onClick={handleBackToDashboard} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Practice Mode</h1>
            <p className="text-sm text-blue-100">
              Difficulty: {problem.difficulty} • Est. {problem.estimatedTime} min
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleBackToDashboard}
            className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-white font-semibold"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-xl text-gray-900">Problem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Question */}
            <div className="text-xl font-semibold leading-relaxed text-gray-900 bg-white p-6 rounded-lg border-2 border-blue-200">
              {problem.question}
            </div>

            {/* Answer Input */}
            {!showResult && (
              <div className="space-y-4">
                {problem.type === 'MULTIPLE_CHOICE' && problem.options ? (
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-gray-900">
                      Select your answer:
                    </label>
                    <div className="space-y-2">
                      {problem.options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            userAnswer === option
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => setUserAnswer(option)}
                        >
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="answer"
                              value={option}
                              checked={userAnswer === option}
                              onChange={(e) => setUserAnswer(e.target.value)}
                              className="mr-3 w-5 h-5"
                            />
                            <span className="text-lg text-gray-900">{option}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label htmlFor="answer" className="text-base font-semibold text-gray-900">
                      Your Answer:
                    </label>
                    <Input
                      id="answer"
                      type="number"
                      step="0.01"
                      placeholder="Enter your answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={submitting}
                      className="text-lg p-6 border-2"
                    />
                  </div>
                )}
                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!userAnswer || submitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-6"
                  >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSteps(!showSteps)}
                    className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold py-6"
                  >
                    {showSteps ? 'Hide' : 'Show'} Hint
                  </Button>
                </div>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-lg font-semibold ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </span>
                  <span className="text-sm text-gray-600">
                    Correct answer: {typeof problem.correctAnswer === 'number'
                      ? problem.correctAnswer.toFixed(2)
                      : problem.correctAnswer}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-gray-700 mb-3">
                    Your answer: {problem.type === 'MULTIPLE_CHOICE'
                      ? userAnswer
                      : parseFloat(userAnswer).toFixed(2)}
                  </p>
                )}
                {problem.explanation && (
                  <p className="text-sm text-gray-700 mt-3 p-3 bg-white rounded border">
                    {problem.explanation}
                  </p>
                )}
                <Button onClick={handleNextProblem} className="w-full mt-2">
                  Next Problem
                </Button>
              </div>
            )}

            {/* Hint/Explanation */}
            {showSteps && problem.explanation && !showResult && (
              <Card className="bg-blue-50 border-2 border-blue-300">
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-lg text-gray-900">Hint</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-base text-gray-900">{problem.explanation}</p>
                </CardContent>
              </Card>
            )}

            {/* Solution Steps for calculation problems */}
            {showSteps && problem.steps && problem.steps.length > 0 && (
              <Card className="bg-blue-50 border-2 border-blue-300 mt-4">
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-lg text-gray-900">Solution Steps</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ol className="space-y-4">
                    {problem.steps.map((step) => (
                      <li key={step.stepNumber} className="flex gap-3">
                        <span className="font-bold text-lg text-blue-700">
                          {step.stepNumber}.
                        </span>
                        <div>
                          <p className="text-base font-medium text-gray-900">{step.instruction}</p>
                          {step.formula && (
                            <p className="text-base text-gray-800 mt-2 font-mono bg-white p-2 rounded border">
                              {step.formula}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
