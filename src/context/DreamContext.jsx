import React, { createContext, useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const DreamContext = createContext();

export const DreamProvider = ({ children }) => {
  const { user } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDreams([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Path: users/{uid}/dreams/{dreamId}
    const dreamsRef = collection(db, 'users', user.uid, 'dreams');
    // Order by date descending
    const q = query(dreamsRef, orderBy('date', 'desc'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dreamsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDreams(dreamsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching dreams:", error);
      toast.error("Failed to load dreams.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addDream = useCallback(async (dreamData) => {
    if (!user) return;
    try {
      const dreamsRef = collection(db, 'users', user.uid, 'dreams');
      await addDoc(dreamsRef, {
        ...dreamData,
        createdAt: serverTimestamp()
      });
      toast.success('Dream logged successfully!');
    } catch (error) {
      console.error("Error adding dream:", error);
      toast.error('Failed to save dream.');
      throw error;
    }
  }, [user]);

  const updateDream = useCallback(async (dreamId, updatedData) => {
    if (!user) return;
    try {
      const dreamRef = doc(db, 'users', user.uid, 'dreams', dreamId);
      await updateDoc(dreamRef, updatedData);
      toast.success('Dream updated successfully!');
    } catch (error) {
      console.error("Error updating dream:", error);
      toast.error('Failed to update dream.');
      throw error;
    }
  }, [user]);

  const deleteDream = useCallback(async (dreamId) => {
    if (!user) return;
    try {
      const dreamRef = doc(db, 'users', user.uid, 'dreams', dreamId);
      await deleteDoc(dreamRef);
      toast.success('Dream deleted.');
    } catch (error) {
      console.error("Error deleting dream:", error);
      toast.error('Failed to delete dream.');
      throw error;
    }
  }, [user]);

  const value = {
    dreams,
    addDream,
    updateDream,
    deleteDream,
    loading
  };

  return (
    <DreamContext.Provider value={value}>
      {children}
    </DreamContext.Provider>
  );
};
