import React from 'react';

const tagColors = {
  Joy: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Fear: 'bg-red-500/20 text-red-300 border-red-500/30',
  Anxiety: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Peace: 'bg-green-500/20 text-green-300 border-green-500/30',
  Confusion: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Sadness: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Excitement: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Anger: 'bg-red-700/20 text-red-400 border-red-700/30',
};

export const MoodBadge = ({ emotion }) => {
  const colorClass = tagColors[emotion] || 'bg-white/10 text-white/80 border-white/20';
  
  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${colorClass}`}>
      {emotion}
    </span>
  );
};
