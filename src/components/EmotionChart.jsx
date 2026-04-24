import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const tagColors = {
  Joy: '#f59e0b',
  Fear: '#ef4444',
  Anxiety: '#f97316',
  Peace: '#22c55e',
  Confusion: '#06b6d4',
  Sadness: '#3b82f6',
  Excitement: '#ec4899',
  Anger: '#b91c1c',
};

export const EmotionChart = ({ dreams }) => {
  const data = useMemo(() => {
    if (!dreams || dreams.length === 0) return [];
    
    const freqMap = {};
    dreams.forEach(dream => {
      dream.tags?.forEach(tag => {
        freqMap[tag] = (freqMap[tag] || 0) + 1;
      });
    });

    return Object.keys(freqMap)
      .map(tag => ({
        name: tag,
        count: freqMap[tag],
        color: tagColors[tag] || '#06b6d4'
      }))
      .sort((a, b) => b.count - a.count);
  }, [dreams]);

  if (data.length === 0) {
    return (
      <div className="glass-card p-6 h-64 flex items-center justify-center text-textMuted">
        No emotion data available yet.
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-72">
      <h3 className="text-lg font-serif mb-4">Emotion Frequency</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            contentStyle={{ backgroundColor: '#12101f', borderColor: '#06b6d4', borderRadius: '8px' }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
