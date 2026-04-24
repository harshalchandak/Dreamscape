import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Moon, Mail, Lock, LogIn, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Moon className="w-8 h-8 text-primary fill-current" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-textMuted">Continue your journey into the subconscious</p>
        </div>

        <div className="glass-card p-8 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" />
                <input
                  type="email"
                  required
                  className="glass-input w-full pl-11"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" />
                <input
                  type="password"
                  required
                  className="glass-input w-full pl-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2 py-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Enter the Dreamscape</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-textMuted text-sm">
              New to Dreamscape?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors flex items-center justify-center inline-flex ml-1">
                Create an account <Sparkles className="w-3 h-3 ml-1" />
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-textMuted/50">
          Secure, encrypted journal for your private thoughts
        </div>
      </div>
    </div>
  );
};

export default Login;
