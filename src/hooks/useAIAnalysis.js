import { useState, useCallback } from 'react';
import { analyzeDreams, askAboutSymbol } from '../services/claudeAPI';
import toast from 'react-hot-toast';

export const useAIAnalysis = () => {
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (dreams) => {
    if (!dreams || dreams.length === 0) {
      toast.error("Not enough dreams to analyze.");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    try {
      // Analyze up to 10 recent dreams as requested
      const recentDreams = dreams.slice(0, 10);
      const analysisResult = await analyzeDreams(recentDreams);
      setResult(analysisResult);
      toast.success("Analysis complete!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to analyze dreams.");
      toast.error("Error analyzing dreams. Please check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const askSymbol = useCallback(async (symbol, dreams) => {
    if (!symbol || !dreams || dreams.length === 0) return null;
    
    try {
      const response = await askAboutSymbol(symbol, dreams);
      return response;
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch symbol meaning.");
      return null;
    }
  }, []);

  return { analyze, result, isAnalyzing, error, askSymbol };
};
