
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('jira_token');
      const userData = localStorage.getItem('jira_user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        const isValid = await authService.validateToken(token);
        
        if (isValid) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, jiraCredentials) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password, jiraCredentials);
      
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('jira_token', response.token);
        localStorage.setItem('jira_user', JSON.stringify(response.user));
        localStorage.setItem('jira_credentials', JSON.stringify(jiraCredentials));
        
        toast({
          title: "Login Successful! 🎉",
          description: "Welcome to your Jira dashboard!",
        });
        
        return { success: true };
      } else {
        toast({
          title: "Login Failed",
          description: response.message || "Invalid credentials",
          variant: "destructive",
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jira_token');
    localStorage.removeItem('jira_user');
    localStorage.removeItem('jira_credentials');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
