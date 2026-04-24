import React, { useState, useEffect, useRef } from 'react';
import { useDreams } from '../hooks/useDreams';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import { Loader } from '../components/Loader';
import { Sparkles, Brain, Search, MessageSquare, ArrowRight } from 'lucide-react';

const Analysis = () => {
  const { dreams, loading: dreamsLoading } = useDreams();
  const { analyze, result, isAnalyzing, error, askSymbol } = useAIAnalysis();
  
  const [symbolQuery, setSymbolQuery] = useState('');
  const [symbolResult, setSymbolResult] = useState('');
  const [isAskingSymbol, setIsAskingSymbol] = useState(false);
  
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const handleAnalyze = () => {
    analyze(dreams);
  };

  const handleAskSymbol = async (e) => {
    e.preventDefault();
    if (!symbolQuery.trim()) return;
    
    setIsAskingSymbol(true);
    const answer = await askSymbol(symbolQuery, dreams);
    setSymbolResult(answer);
    setIsAskingSymbol(false);
  };

  if (dreamsLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Pattern Analyzer</h1>
        <p className="text-textMuted text-lg max-w-2xl mx-auto">
          Our AI uses advanced psychological frameworks to analyze your dream journal. 
          Discover hidden meanings, emotional arcs, and recurring symbols in your subconscious.
        </p>
      </div>

      {!result && !isAnalyzing && (
        <div className="glass-card p-8 text-center max-w-2xl mx-auto">
          <Brain className="w-16 h-16 text-accent mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl font-serif mb-2">Ready for insight?</h2>
          <p className="text-textMuted mb-8">
            We will analyze your {Math.min(dreams.length, 10)} most recent dreams to generate a comprehensive psychological profile.
          </p>
          <button 
            onClick={handleAnalyze} 
            disabled={dreams.length === 0}
            className="btn-primary flex items-center justify-center w-full sm:w-auto sm:mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:shadow-none"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {dreams.length === 0 ? 'Not enough dreams to analyze' : 'Start Deep Analysis'}
          </button>
        </div>
      )}

      {isAnalyzing && (
        <div className="glass-card p-12 text-center">
          <Loader text="Synthesizing emotional patterns and psychological themes..." />
        </div>
      )}

      {error && !isAnalyzing && (
        <div className="bg-danger/10 border border-danger/30 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <p className="text-danger mb-4">{error}</p>
          <button onClick={handleAnalyze} className="btn-secondary">Try Again</button>
        </div>
      )}

      {result && (
        <div ref={resultRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <h2 className="text-2xl font-serif mb-4 flex items-center text-primary">
              <Sparkles className="w-6 h-6 mr-3" />
              Summary Insight
            </h2>
            <p className="text-lg leading-relaxed text-textPrimary relative z-10">
              {result.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h2 className="text-xl font-serif mb-6 text-accent">Recurring Themes</h2>
              <ul className="space-y-3">
                {result.recurringThemes?.map((theme, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-textPrimary">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-serif mb-6 text-pink-400">Emotional Arc</h2>
              <p className="text-textPrimary leading-relaxed">
                {result.emotionalArc}
              </p>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-serif mb-6 text-yellow-400">Top Symbols</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {result.topSymbols?.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <div className="text-lg font-bold mb-2 capitalize">{item.symbol}</div>
                  <div className="text-xs text-primary mb-3">Appeared {item.frequency} times</div>
                  <p className="text-sm text-textMuted">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-t-4 border-green-500/50">
              <h2 className="text-xl font-serif mb-4 text-green-400">Psychological Insight</h2>
              <p className="text-textPrimary leading-relaxed">
                {result.psychologicalInsight}
              </p>
            </div>

            <div className="glass-card p-8 border-t-4 border-blue-500/50">
              <h2 className="text-xl font-serif mb-4 text-blue-400">Recommendation</h2>
              <p className="text-textPrimary leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>

          {/* Ask About Symbol Feature */}
          <div className="glass-card p-8 mt-12 bg-surface/80 border-primary/20">
            <h2 className="text-2xl font-serif mb-2 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-primary" />
              Dream Dictionary
            </h2>
            <p className="text-textMuted mb-6">
              Curious about a specific symbol from your dreams? Ask our AI for a contextual psychological interpretation.
            </p>
            
            <form onSubmit={handleAskSymbol} className="flex gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted" />
                <input
                  type="text"
                  value={symbolQuery}
                  onChange={(e) => setSymbolQuery(e.target.value)}
                  placeholder="e.g. falling, water, teeth falling out..."
                  className="glass-input w-full pl-12"
                />
              </div>
              <button 
                type="submit" 
                disabled={isAskingSymbol || !symbolQuery.trim()}
                className="btn-primary whitespace-nowrap disabled:opacity-50"
              >
                {isAskingSymbol ? 'Thinking...' : 'Interpret'}
              </button>
            </form>

            {symbolResult && (
              <div className="bg-black/20 rounded-xl p-6 border border-white/5 animate-in fade-in">
                <div className="flex items-start">
                  <Sparkles className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                    {symbolResult}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
