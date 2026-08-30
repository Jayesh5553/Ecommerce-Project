import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

export interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<AuthResult>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => Promise<AuthResult>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        const profile = await authService.getProfile();
        if (profile) {
          setUser(profile);
        } else {
          // Token is expired or invalid
          authService.logout();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<AuthResult> => {
    try {
      const authData = await authService.login(credentials);
      if (!authData || !authData.access) {
        authService.logout();
        setUser(null);
        return { success: false, error: 'Authentication failed. No access token received.' };
      }

      const profile = await authService.getProfile();
      if (profile) {
        setUser(profile);
      } else {
        setUser({
          id: 1,
          username: credentials.username,
          email: '',
        });
      }
      setShowAuthModal(false);
      return { success: true };
    } catch (err: any) {
      authService.logout();
      setUser(null);

      const status = err.response?.status;
      const data = err.response?.data;

      if (status >= 500) {
        return {
          success: false,
          error: `Server Error (${status}): The authentication service encountered an internal error. Please try again later.`,
        };
      }

      if (!err.response && err.request) {
        return {
          success: false,
          error: 'Network Error: Unable to connect to the backend server. Please verify your connection or server status.',
        };
      }

      let errorMsg = 'Invalid username or password.';
      if (data) {
        if (typeof data === 'string' && !data.includes('<!DOCTYPE') && !data.includes('<html>')) {
          errorMsg = data;
        } else if (data.detail) {
          errorMsg = data.detail;
        } else if (data.non_field_errors) {
          errorMsg = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors;
        }
      }
      return { success: false, error: errorMsg };
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }): Promise<AuthResult> => {
    try {
      await authService.register(userData);
      return await login({ username: userData.username, password: userData.password });
    } catch (err: any) {
      authService.logout();
      setUser(null);

      const status = err.response?.status;
      const data = err.response?.data;

      if (status >= 500) {
        return {
          success: false,
          error: `Server Error (${status}): Registration service encountered an internal error. Please try again later.`,
        };
      }

      if (!err.response && err.request) {
        return {
          success: false,
          error: 'Network Error: Unable to connect to the backend server. Please verify your connection or server status.',
        };
      }

      let errorMsg = 'Registration failed. Please check the entered details.';
      if (data) {
        if (typeof data === 'string' && !data.includes('<!DOCTYPE') && !data.includes('<html>')) {
          errorMsg = data;
        } else if (data.username) {
          errorMsg = Array.isArray(data.username) ? data.username[0] : data.username;
        } else if (data.email) {
          errorMsg = Array.isArray(data.email) ? data.email[0] : data.email;
        } else if (data.password) {
          errorMsg = Array.isArray(data.password) ? data.password[0] : data.password;
        } else if (data.detail) {
          errorMsg = data.detail;
        } else if (data.non_field_errors) {
          errorMsg = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors;
        }
      }
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
