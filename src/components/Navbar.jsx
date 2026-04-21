import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Moon, LogOut, LayoutDashboard, Sparkles, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) return null;

    return (
        <nav className="border-b border-white/5 bg-surface/50 backdrop-blur-md sticky top-0 z-40 w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors group">
                            <Moon className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-12" />
                            <span className="font-serif text-xl font-bold tracking-wide">Dreamscape</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `
                                relative p-2 rounded-lg transition-colors duration-200 flex items-center group
                                ${isActive ? 'text-primary' : 'text-textMuted hover:text-primary'}
                            `}
                            title="Dashboard"
                        >
                            {({ isActive }) => (
                                <>
                                    <LayoutDashboard className="w-5 h-5 relative z-10" />
                                    <span className="hidden sm:inline-block ml-2 text-sm font-medium relative z-10">Dashboard</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-highlight"
                                            className="absolute inset-0 bg-primary/10 rounded-lg shadow-[0_0_15px_rgba(167,139,250,0.1)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/analysis"
                            className={({ isActive }) => `
                                relative p-2 rounded-lg transition-colors duration-200 flex items-center group
                                ${isActive ? 'text-accent' : 'text-textMuted hover:text-accent'}
                            `}
                            title="AI Analysis"
                        >
                            {({ isActive }) => (
                                <>
                                    <Sparkles className="w-5 h-5 relative z-10" />
                                    <span className="hidden sm:inline-block ml-2 text-sm font-medium relative z-10">Analysis</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-highlight"
                                            className="absolute inset-0 bg-accent/10 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/new-dream"
                            className={({ isActive }) => `
                                relative p-2 transition-all duration-200 flex items-center
                                ${isActive ? 'text-secondary' : 'text-primary hover:scale-110'}
                            `}
                            title="New Dream"
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`
                                        p-2 rounded-full relative z-10
                                        ${isActive ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-primary/10'}
                                    `}>
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-highlight"
                                            className="absolute inset-0 bg-primary/5 rounded-lg opacity-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>

                        <div className="w-px h-6 bg-white/10 mx-1 sm:mx-2"></div>

                        <span className="hidden md:inline-block text-sm text-textPrimary mr-2">
                            {user.displayName || user.email}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="p-2 text-textMuted hover:text-danger transition-colors flex items-center group"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
