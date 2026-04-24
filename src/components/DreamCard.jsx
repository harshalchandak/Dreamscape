import React from 'react';
import { Link } from 'react-router-dom';
import { MoodBadge } from './MoodBadge';
import { Moon, Sun, Calendar } from 'lucide-react';

export const DreamCard = ({ dream }) => {
  return (
    <Link to={`/dream/${dream.id}`} className="block transition-transform hover:-translate-y-1">
      <div className="glass-card p-5 group hover:border-primary/50">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif text-textPrimary group-hover:text-primary transition-colors line-clamp-1">
            {dream.title}
          </h3>
          <div className="flex items-center text-xs text-textMuted bg-surface px-2 py-1 rounded-md">
            <Calendar className="w-3 h-3 mr-1" />
            {dream.date}
          </div>
        </div>
        
        <p className="text-sm text-textMuted mb-4 line-clamp-2">
          {dream.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {dream.tags?.map(tag => (
            <MoodBadge key={tag} emotion={tag} />
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-textMuted border-t border-white/5 pt-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center" title="Mood Before Sleep">
              <Moon className="w-4 h-4 mr-1 text-cyan-400" />
              <span>{dream.moodBefore}/10</span>
            </div>
            <div className="flex items-center" title="Mood After Waking">
              <Sun className="w-4 h-4 mr-1 text-yellow-400" />
              <span>{dream.moodAfter}/10</span>
            </div>
          </div>
          {dream.isLucid && (
            <span className="text-primary font-medium flex items-center">
              ✨ Lucid
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
