import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const DreamContext = createContext();

export const DreamProvider = ({ children }) => {
    const { user } = useAuth();
    const [dreams, setDreams] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial load from localStorage
    useEffect(() => {
        if (!user) {
            setDreams([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const storageKey = `dreamscape_dreams_${user.uid}`;
        const storedDreams = localStorage.getItem(storageKey);
        
        if (storedDreams) {
            try {
                // Parse and sort by date descending (latest first)
                const parsedDreams = JSON.parse(storedDreams);
                const sortedDreams = parsedDreams.sort((a, b) => {
                    const dateA = new Date(a.date || a.createdAt);
                    const dateB = new Date(b.date || b.createdAt);
                    return dateB - dateA;
                });
                setDreams(sortedDreams);
            } catch (e) {
                console.error("Failed to parse dreams from storage", e);
                setDreams([]);
            }
        } else {
            setDreams([]);
        }
        setLoading(false);
    }, [user]);

    // Helper to persist dreams to localStorage and update state
    const persistDreams = useCallback((newDreams) => {
        if (!user) return;
        const storageKey = `dreamscape_dreams_${user.uid}`;
        localStorage.setItem(storageKey, JSON.stringify(newDreams));
        setDreams(newDreams);
    }, [user]);

    const addDream = useCallback(async (dreamData) => {
        if (!user) return;
        try {
            // Simulated delay for premium feel
            await new Promise(resolve => setTimeout(resolve, 600));

            const newDream = {
                id: 'dream_' + Date.now() + Math.random().toString(36).substr(2, 5),
                ...dreamData,
                createdAt: new Date().toISOString()
            };
            
            const updatedDreams = [newDream, ...dreams];
            persistDreams(updatedDreams);
            toast.success('Dream logged successfully!');
        } catch (error) {
            console.error("Error adding dream:", error);
            toast.error('Failed to save dream.');
            throw error;
        }
    }, [user, dreams, persistDreams]);

    const updateDream = useCallback(async (dreamId, updatedData) => {
        if (!user) return;
        try {
            await new Promise(resolve => setTimeout(resolve, 400));

            const updatedDreams = dreams.map(dream => 
                dream.id === dreamId ? { ...dream, ...updatedData, updatedAt: new Date().toISOString() } : dream
            );
            persistDreams(updatedDreams);
            toast.success('Dream updated successfully!');
        } catch (error) {
            console.error("Error updating dream:", error);
            toast.error('Failed to update dream.');
            throw error;
        }
    }, [user, dreams, persistDreams]);

    const deleteDream = useCallback(async (dreamId) => {
        if (!user) return;
        try {
            await new Promise(resolve => setTimeout(resolve, 400));

            const updatedDreams = dreams.filter(dream => dream.id !== dreamId);
            persistDreams(updatedDreams);
            toast.success('Dream deleted.');
        } catch (error) {
            console.error("Error deleting dream:", error);
            toast.error('Failed to delete dream.');
            throw error;
        }
    }, [user, dreams, persistDreams]);

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
