import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { DreamProvider } from './context/DreamContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewDream from './pages/NewDream';
import DreamDetail from './pages/DreamDetail';

// Lazy load Analysis page
const Analysis = React.lazy(() => import('./pages/Analysis'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DreamProvider>
          <div className="min-h-screen flex flex-col selection:bg-primary/30">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<Loader fullScreen />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/new-dream" 
                    element={
                      <ProtectedRoute>
                        <NewDream />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dream/:id" 
                    element={
                      <ProtectedRoute>
                        <DreamDetail />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/analysis" 
                    element={
                      <ProtectedRoute>
                        <Analysis />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Default Route */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
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
