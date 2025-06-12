
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/LoginPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
