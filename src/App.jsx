import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { DreamProvider } from './context/DreamContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import PageTransition from './components/PageTransition';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewDream from './pages/NewDream';
import DreamDetail from './pages/DreamDetail';

// Lazy load Analysis page
const Analysis = React.lazy(() => import('./pages/Analysis'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/new-dream" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <NewDream />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dream/:id" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <DreamDetail />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analysis" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <Suspense fallback={<Loader fullScreen />}>
                  <Analysis />
                </Suspense>
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DreamProvider>
          <div className="min-h-screen flex flex-col selection:bg-primary/30">
            <Navbar />
            <main className="flex">
              <AnimatedRoutes />
            </main>
          </div>
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#12101f',
                color: '#e8e0f0',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
              },
            }}
          />
        </DreamProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
