import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial session check
        const storedUser = localStorage.getItem('dreamscape_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('dreamscape_user');
            }
        }
        setLoading(false);
    }, []);

    const signup = async (email, password, displayName) => {
        try {
            // Simulated delay for premium feel
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const users = JSON.parse(localStorage.getItem('dreamscape_users') || '[]');
            
            if (users.find(u => u.email === email)) {
                throw new Error('An account with this email already exists.');
            }

            const newUser = {
                uid: 'user_' + Date.now() + Math.random().toString(36).substr(2, 5),
                email,
                displayName,
                createdAt: new Date().toISOString()
            };

            // In local storage mock, we store the password too
            users.push({ ...newUser, password });
            localStorage.setItem('dreamscape_users', JSON.stringify(users));
            
            // Set current session
            localStorage.setItem('dreamscape_user', JSON.stringify(newUser));
            setUser(newUser);
            
            toast.success('Account created successfully!');
            return newUser;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const users = JSON.parse(localStorage.getItem('dreamscape_users') || '[]');
            const foundUser = users.find(u => u.email === email && u.password === password);
            
            if (!foundUser) {
                throw new Error('Invalid email or password.');
            }

            const { password: _, ...userSession } = foundUser;
            localStorage.setItem('dreamscape_user', JSON.stringify(userSession));
            setUser(userSession);
            
            toast.success('Logged in successfully!');
            return userSession;
        } catch (error) {
            toast.error(error.message || 'Failed to log in. Please check your credentials.');
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('dreamscape_user');
            setUser(null);
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    };

    const value = {
        user,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
