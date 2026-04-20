import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDreams } from '../hooks/useDreams';
import { StreakBar } from '../components/StreakBar';
import { DreamCard } from '../components/DreamCard';
import { EmotionChart } from '../components/EmotionChart';
import { Loader } from '../components/Loader';
import { Plus, Book, Activity, Moon } from 'lucide-react';
import { format, subDays, isAfter } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const { dreams, loading } = useDreams();

  const todayStr = format(new Date(), 'EEEE, MMMM do');

  const stats = useMemo(() => {
    if (!dreams || dreams.length === 0) {
      return { total: 0, avgMood: 0 };
    }

    const total = dreams.length;
    
    // Calculate avg mood for last 7 days
    const sevenDaysAgo = subDays(new Date(), 7);
    const recentDreams = dreams.filter(d => isAfter(new Date(d.date), sevenDaysAgo));
    
    let avgMood = 0;
    if (recentDreams.length > 0) {
      const sum = recentDreams.reduce((acc, curr) => acc + Number(curr.moodAfter), 0);
      avgMood = (sum / recentDreams.length).toFixed(1);
    }

    return { total, avgMood };
  }, [dreams]);

  if (loading) {
    return <Loader fullScreen text="Loading your universe..." />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2">
          Hello, {user?.displayName || 'Dreamer'}
        </h1>
        <p className="text-textMuted text-lg">{todayStr}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-1">
          <StreakBar dreams={dreams} />
        </div>
        
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/20 text-primary">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Dreams</h3>
              <p className="text-xs text-textMuted">Logged in journal</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.total}
          </div>
        </div>

        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-accent/20 text-accent">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Avg Mood</h3>
              <p className="text-xs text-textMuted">Waking (Last 7 days)</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            {stats.avgMood > 0 ? `${stats.avgMood}/10` : '-'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-semibold">Recent Dreams</h2>
            <Link to="/new-dream" className="text-primary hover:text-primary/80 font-medium flex items-center text-sm transition-colors">
              <Plus className="w-4 h-4 mr-1" />
              Log Dream
            </Link>
          </div>

          {dreams.length === 0 ? (
            <div className="glass-card p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Moon className="w-10 h-10 text-textMuted" />
              </div>
              <h3 className="text-xl font-medium mb-2">No dreams yet</h3>
              <p className="text-textMuted mb-6 max-w-md">
                Your journal is empty. Start logging your dreams to discover hidden patterns and insights.
              </p>
              <Link to="/new-dream" className="btn-primary">
                Log Your First Dream
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {dreams.slice(0, 5).map(dream => (
                <DreamCard key={dream.id} dream={dream} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <EmotionChart dreams={dreams} />
            
            <div className="mt-6 glass-card p-6 bg-gradient-to-br from-surface to-primary/10 border-primary/20">
              <h3 className="text-xl font-serif mb-2">Unlock Insights</h3>
              <p className="text-sm text-textMuted mb-6">
                Let AI analyze your recent dreams to reveal hidden emotional patterns and psychological themes.
              </p>
              <Link to="/analysis" className="btn-primary w-full block text-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                Analyze My Dreams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
