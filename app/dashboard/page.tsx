'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  problems: any[];
  progress: any[];
}

interface Unit {
  id: string;
  code: string;
  name: string;
  description: string;
  topics: Topic[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await fetch('/api/units');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch units');
      }
      const data = await response.json();
      setUnits(data.units);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handlePractice = (topicId: string) => {
    router.push(`/practice/${topicId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">EngineerIQ</h1>
            <p className="text-sm text-blue-100">T-Level Engineering Practice</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-white text-blue-700 hover:bg-blue-50 border-2 border-white font-semibold"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ireoluwa!</h2>
          <p className="text-lg text-gray-600">Choose a topic to start practicing</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-2 border-blue-400 hover:shadow-lg transition-all cursor-pointer" onClick={() => router.push('/stats')}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="font-bold text-gray-900">Performance Stats</h3>
                  <p className="text-sm text-gray-600">View your progress and weak areas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-400 hover:shadow-lg transition-all cursor-pointer" onClick={() => router.push('/formulas')}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="text-4xl">📐</div>
                <div>
                  <h3 className="font-bold text-gray-900">Formula Reference</h3>
                  <p className="text-sm text-gray-600">Quick access to all formulas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-400 hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-900">Practice Modes</h3>
                  <p className="text-sm text-gray-600">Timed, weak areas, review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {units.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No topics available yet. Please contact your guardian.</p>
          </div>
        )}

        {/* Units */}
        <div className="space-y-8">
          {units.map((unit) => (
            <div key={unit.id}>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{unit.name}</h3>
                <p className="text-sm text-gray-500">{unit.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unit.topics.map((topic) => {
                  const progress = topic.progress[0];
                  const masteryLevel = progress?.masteryLevel || 0;
                  const totalAttempts = progress?.totalAttempts || 0;
                  const problemCount = topic.problems.length;

                  return (
                    <Card key={topic.id} className="hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-blue-400">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-gray-900">{topic.name}</CardTitle>
                            <CardDescription className="mt-1 text-gray-700">
                              {topic.description}
                            </CardDescription>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            topic.difficulty === 'FOUNDATION' ? 'bg-green-500 text-white' :
                            topic.difficulty === 'INTERMEDIATE' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            {topic.difficulty}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {/* Progress Bar */}
                          {totalAttempts > 0 && (
                            <div>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Mastery</span>
                                <span>{Math.round(masteryLevel * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${masteryLevel * 100}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Stats */}
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{problemCount} problems</span>
                            {totalAttempts > 0 && (
                              <span>{totalAttempts} attempts</span>
                            )}
                          </div>

                          {/* Action Button */}
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            onClick={() => handlePractice(topic.id)}
                            disabled={problemCount === 0}
                          >
                            {totalAttempts > 0 ? 'Continue Practice →' : 'Start Practice →'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
