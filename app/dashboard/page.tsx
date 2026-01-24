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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">EngineerIQ</h1>
            <p className="text-sm text-gray-500">T-Level Engineering Practice</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ireoluwa!</h2>
          <p className="text-gray-600">Choose a topic to start practicing</p>
        </div>

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
                    <Card key={topic.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{topic.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {topic.description}
                            </CardDescription>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            topic.difficulty === 'FOUNDATION' ? 'bg-green-100 text-green-800' :
                            topic.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
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
                            className="w-full"
                            onClick={() => handlePractice(topic.id)}
                            disabled={problemCount === 0}
                          >
                            {totalAttempts > 0 ? 'Continue Practice' : 'Start Practice'}
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
