'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GeneratedProblem {
  problemId: string;
  question: string;
  variables: Record<string, number>;
  correctAnswer: number;
  steps: any[];
  difficulty: string;
  estimatedTime: number;
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

    try {
      const response = await fetch('/api/problems/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.problemId,
          topicId,
          userAnswer: parseFloat(userAnswer),
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Practice Mode</h1>
            <p className="text-sm text-gray-500">
              Difficulty: {problem.difficulty} • Est. {problem.estimatedTime} min
            </p>
          </div>
          <Button variant="outline" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Problem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question */}
            <div className="text-lg font-medium leading-relaxed">
              {problem.question}
            </div>

            {/* Answer Input */}
            {!showResult && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="answer" className="text-sm font-medium">
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
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!userAnswer || submitting}
                    className="flex-1"
                  >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSteps(!showSteps)}
                  >
                    {showSteps ? 'Hide' : 'Show'} Steps
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
                    Correct answer: {problem.correctAnswer.toFixed(2)}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-gray-700 mb-3">
                    Your answer: {parseFloat(userAnswer).toFixed(2)}
                  </p>
                )}
                <Button onClick={handleNextProblem} className="w-full mt-2">
                  Next Problem
                </Button>
              </div>
            )}

            {/* Solution Steps */}
            {showSteps && problem.steps.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base">Solution Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {problem.steps.map((step) => (
                      <li key={step.stepNumber} className="flex gap-3">
                        <span className="font-semibold text-blue-600">
                          {step.stepNumber}.
                        </span>
                        <div>
                          <p className="text-gray-700">{step.instruction}</p>
                          {step.formula && (
                            <p className="text-sm text-gray-600 mt-1 font-mono">
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
