import { useContext } from 'react';
import { DreamContext } from '../context/DreamContext';

export const useDreams = () => {
  const context = useContext(DreamContext);
  if (!context) {
    throw new Error('useDreams must be used within a DreamProvider');
  }
  return context;
};
