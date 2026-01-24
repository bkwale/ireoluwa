'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StudentStats {
  id: string;
  name: string;
  email: string;
  totalAttempts: number;
  overallAccuracy: string;
  topicProgress: any[];
  recentAttempts: any[];
}

export default function GuardianDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/guardian/stats');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStudents(data.students);
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
            <h1 className="text-2xl font-bold text-gray-900">Guardian Dashboard</h1>
            <p className="text-sm text-gray-500">Monitor Student Progress</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {students.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">No students found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {students.map((student) => (
              <div key={student.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Attempts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{student.totalAttempts}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Overall Accuracy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{student.overallAccuracy}%</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Topics Practiced
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{student.topicProgress.length}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Topic Progress */}
                {student.topicProgress.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Topic Progress</CardTitle>
                      <CardDescription>Mastery level for each topic</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {student.topicProgress
                          .sort((a, b) => b.masteryLevel - a.masteryLevel)
                          .map((progress, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">
                                  {progress.topicName}
                                  <span className="text-gray-500 ml-2">
                                    ({progress.unitName})
                                  </span>
                                </span>
                                <span className="text-gray-600">
                                  {Math.round(progress.masteryLevel * 100)}% •{' '}
                                  {progress.totalAttempts} attempts
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${progress.masteryLevel * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Activity */}
                {student.recentAttempts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Last 10 problem attempts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {student.recentAttempts.map((attempt: any) => (
                          <div
                            key={attempt.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded"
                          >
                            <div>
                              <span className="font-medium">{attempt.problem.topic.name}</span>
                              <span className="text-sm text-gray-500 ml-2">
                                {new Date(attempt.attemptedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">
                                {attempt.timeSpent}s
                              </span>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  attempt.isCorrect
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {attempt.isCorrect ? 'Correct' : 'Incorrect'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
