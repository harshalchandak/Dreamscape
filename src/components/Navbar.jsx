import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Moon, LogOut, LayoutDashboard, Sparkles, Plus } from 'lucide-react';

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
    <nav className="border-b border-white/5 bg-surface/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
              <Moon className="w-6 h-6 fill-current" />
              <span className="font-serif text-xl font-bold tracking-wide">Dreamscape</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 text-textMuted hover:text-primary transition-colors flex items-center" title="Dashboard">
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline-block ml-2 text-sm font-medium">Dashboard</span>
            </Link>
            
            <Link to="/analysis" className="p-2 text-textMuted hover:text-accent transition-colors flex items-center" title="AI Analysis">
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline-block ml-2 text-sm font-medium">Analysis</span>
            </Link>
            
            <Link to="/new-dream" className="bg-primary/20 text-primary hover:bg-primary/30 p-2 rounded-full transition-colors flex items-center" title="New Dream">
              <Plus className="w-5 h-5" />
            </Link>
            
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            
            <span className="hidden md:inline-block text-sm text-textPrimary mr-2">
              {user.displayName || user.email}
            </span>
            
            <button 
              onClick={handleLogout}
              className="p-2 text-textMuted hover:text-danger transition-colors flex items-center"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
