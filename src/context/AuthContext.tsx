import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  login: (newToken: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);
    } catch (error) {
      console.error('Error checking auth token:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('authToken', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken(null);
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const contextValue: AuthContextType = {
    login,
    logout,
    isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
