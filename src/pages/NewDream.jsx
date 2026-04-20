import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDreams } from '../hooks/useDreams';
import { format } from 'date-fns';

const EMOTIONS = ['Joy', 'Fear', 'Anxiety', 'Peace', 'Confusion', 'Sadness', 'Excitement', 'Anger'];
const SLEEP_QUALITIES = ['Poor', 'Average', 'Good', 'Deep'];

const NewDream = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [description, setDescription] = useState('');
  const [moodBefore, setMoodBefore] = useState(5);
  const [moodAfter, setMoodAfter] = useState(5);
  const [tags, setTags] = useState([]);
  const [sleepQuality, setSleepQuality] = useState('Average');
  const [isLucid, setIsLucid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleRef = useRef(null);
  const { addDream } = useDreams();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-focus title on mount
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleTagToggle = (emotion) => {
    setTags(prev => 
      prev.includes(emotion) 
        ? prev.filter(t => t !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length < 50) {
      alert("Please provide a more detailed description (minimum 50 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDream({
        title,
        date,
        description,
        moodBefore: Number(moodBefore),
        moodAfter: Number(moodAfter),
        tags,
        sleepQuality,
        isLucid
      });
      navigate('/dashboard');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Log a New Dream</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Title</label>
              <input
                ref={titleRef}
                type="text"
                required
                className="glass-input w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A vivid title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Date</label>
              <input
                type="date"
                required
                className="glass-input w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Dream Description</label>
            <textarea
              required
              rows={6}
              minLength={50}
              className="glass-input w-full resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your dream in detail... What happened? Who was there? How did it feel?"
            />
            <div className="flex justify-between mt-1 text-xs text-textMuted">
              <span>Min 50 characters</span>
              <span className={description.length < 50 ? 'text-danger' : 'text-success'}>
                {description.length} chars
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-8">
          <h2 className="text-xl font-serif">Emotional Context</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">
                Mood before sleep: {moodBefore}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full accent-primary"
                value={moodBefore}
                onChange={(e) => setMoodBefore(e.target.value)}
              />
              <div className="flex justify-between text-xs text-textMuted mt-1">
                <span>Terrible</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">
                Mood after waking: {moodAfter}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full accent-accent"
                value={moodAfter}
                onChange={(e) => setMoodAfter(e.target.value)}
              />
              <div className="flex justify-between text-xs text-textMuted mt-1">
                <span>Terrible</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-3">Emotions felt in dream</label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONS.map(emotion => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => handleTagToggle(emotion)}
                  className={`px-4 py-2 rounded-full text-sm transition-all border ${
                    tags.includes(emotion)
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-white/5 border-white/10 text-textMuted hover:border-white/30'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-serif">Sleep Quality</h2>
          
          <div>
            <div className="flex flex-wrap gap-4">
              {SLEEP_QUALITIES.map(quality => (
                <label key={quality} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sleepQuality"
                    value={quality}
                    checked={sleepQuality === quality}
                    onChange={(e) => setSleepQuality(e.target.value)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-textPrimary">{quality}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
            <input
              type="checkbox"
              id="isLucid"
              checked={isLucid}
              onChange={(e) => setIsLucid(e.target.checked)}
              className="accent-primary w-5 h-5 rounded"
            />
            <label htmlFor="isLucid" className="text-textPrimary cursor-pointer flex items-center">
              This was a lucid dream <span className="ml-2 text-xs text-textMuted">(I was aware I was dreaming)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Dream'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDream;
