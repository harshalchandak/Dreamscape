import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDreams } from '../hooks/useDreams';
import { MoodBadge } from '../components/MoodBadge';
import { Loader } from '../components/Loader';
import { Moon, Sun, Calendar, Trash2, ArrowLeft } from 'lucide-react';

const DreamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dreams, loading, deleteDream } = useDreams();
  const [isDeleting, setIsDeleting] = useState(false);

  const dream = useMemo(() => {
    return dreams.find(d => d.id === id);
  }, [dreams, id]);

  if (loading) return <Loader fullScreen />;
  
  if (!dream) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif mb-4">Dream not found</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dream entry? This cannot be undone.")) {
      setIsDeleting(true);
      try {
        await deleteDream(id);
        navigate('/dashboard');
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-textMuted hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
          <h1 className="text-3xl font-serif font-bold text-white">{dream.title}</h1>
          <div className="flex items-center text-sm text-textMuted bg-surface px-3 py-1.5 rounded-lg whitespace-nowrap">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            {dream.date}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {dream.tags?.map(tag => (
            <MoodBadge key={tag} emotion={tag} />
          ))}
          {dream.isLucid && (
            <span className="px-3 py-1 text-xs font-medium rounded-full border bg-primary/20 text-primary border-primary/30">
              ✨ Lucid Dream
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center text-textMuted text-sm mb-2">
              <Moon className="w-4 h-4 mr-2 text-indigo-400" />
              Before Sleep
            </div>
            <div className="text-2xl font-semibold text-white">{dream.moodBefore}/10</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center text-textMuted text-sm mb-2">
              <Sun className="w-4 h-4 mr-2 text-yellow-400" />
              After Waking
            </div>
            <div className="text-2xl font-semibold text-white">{dream.moodAfter}/10</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="text-textMuted text-sm mb-2">Sleep Quality</div>
            <div className="text-lg font-medium text-white">{dream.sleepQuality}</div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <h3 className="text-xl font-serif mb-4 text-white">The Dream</h3>
          <p className="text-textPrimary leading-relaxed whitespace-pre-wrap">
            {dream.description}
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex justify-end">
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center text-danger hover:bg-danger/10 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete Dream'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DreamDetail;
