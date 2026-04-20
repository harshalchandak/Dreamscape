import React, { useMemo } from 'react';
import { Flame } from 'lucide-react';
import { differenceInDays, parseISO, startOfDay } from 'date-fns';

export const StreakBar = ({ dreams }) => {
  const streakCount = useMemo(() => {
    if (!dreams || dreams.length === 0) return 0;

    // Sort dreams by date descending just to be safe
    const sortedDreams = [...dreams].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let currentStreak = 0;
    let expectedDate = startOfDay(new Date()); // Today
    
    // Check if the most recent dream was today or yesterday
    const mostRecentDate = startOfDay(parseISO(sortedDreams[0].date));
    const daysSinceMostRecent = differenceInDays(expectedDate, mostRecentDate);
    
    if (daysSinceMostRecent > 1) {
      return 0; // Streak broken
    }

    // Set expectation to the date of the most recent dream
    expectedDate = mostRecentDate;

    for (let i = 0; i < sortedDreams.length; i++) {
      const dreamDate = startOfDay(parseISO(sortedDreams[i].date));
      const diff = differenceInDays(expectedDate, dreamDate);

      if (diff === 0) {
        // Same day (multiple dreams on same day), just continue
        if (i === 0 || differenceInDays(startOfDay(parseISO(sortedDreams[i-1].date)), dreamDate) !== 0) {
           currentStreak++;
        }
      } else if (diff === 1) {
        // Consecutive day
        currentStreak++;
        expectedDate = dreamDate;
      } else {
        // Gap found, streak ends
        break;
      }
    }

    return currentStreak;
  }, [dreams]);

  return (
    <div className="glass-card p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${streakCount > 0 ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-textMuted'}`}>
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{streakCount} Day Streak</h3>
          <p className="text-xs text-textMuted">Log daily to keep the fire alive!</p>
        </div>
      </div>
      <div className="text-3xl font-bold text-primary">
        {streakCount}
      </div>
    </div>
  );
};
