'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Stats {
  overall: {
    totalAttempts: number;
    correctAttempts: number;
    successRate: number;
    averageTime: number;
  };
  topicStats: Array<{
    topicId: string;
    topicName: string;
    unitName: string;
    total: number;
    correct: number;
    successRate: number;
    averageTime: number;
  }>;
  weakAreas: Array<{
    topicName: string;
    successRate: number;
    total: number;
  }>;
  strongAreas: Array<{
    topicName: string;
    successRate: number;
    total: number;
  }>;
}

export default function StatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/student/stats');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading stats...</div>
      </div>
    );
  }

  if (!stats || stats.overall.totalAttempts === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-xl font-semibold mb-2">No Stats Yet</p>
            <p className="text-gray-600 mb-4">Start practicing to see your performance data!</p>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Performance Dashboard</h1>
            <p className="text-sm text-blue-100 mt-1">Track your progress and improve</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Overall Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{stats.overall.successRate}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {stats.overall.correctAttempts} of {stats.overall.totalAttempts} correct
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{stats.overall.averageTime}s</div>
              <p className="text-xs text-gray-500 mt-1">per question</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600">{stats.overall.totalAttempts}</div>
              <p className="text-xs text-gray-500 mt-1">questions attempted</p>
            </CardContent>
          </Card>
        </div>

        {/* Weak Areas and Strong Areas */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-800">⚠️ Weak Areas (Need Practice)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {stats.weakAreas.length === 0 ? (
                <p className="text-gray-600">No weak areas identified yet. Keep practicing!</p>
              ) : (
                <div className="space-y-3">
                  {stats.weakAreas.map((area, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-red-200">
                      <div className="font-semibold text-gray-900">{area.topicName}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">{area.total} attempts</span>
                        <span className="text-lg font-bold text-red-600">{Math.round(area.successRate)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800">✓ Strong Areas (Well Done!)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {stats.strongAreas.length === 0 ? (
                <p className="text-gray-600">Keep practicing to identify your strengths!</p>
              ) : (
                <div className="space-y-3">
                  {stats.strongAreas.map((area, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-green-200">
                      <div className="font-semibold text-gray-900">{area.topicName}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">{area.total} attempts</span>
                        <span className="text-lg font-bold text-green-600">{Math.round(area.successRate)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Topic Performance */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Performance by Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topicStats
                .sort((a, b) => b.total - a.total)
                .slice(0, 15)
                .map((topic, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">{topic.topicName}</div>
                        <div className="text-xs text-gray-500">{topic.unitName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{Math.round(topic.successRate)}%</div>
                        <div className="text-xs text-gray-500">{topic.correct}/{topic.total}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Avg time: {topic.averageTime}s</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
