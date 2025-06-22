import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, getAuthToken, setAuthToken, removeAuthToken, Seller } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  seller: Seller | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (sellerData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    businessName: string;
    address: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [token, setTokenState] = useState<string | null>(null);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = getAuthToken();
        if (storedToken) {
          const sellerData = await authAPI.getProfile(storedToken);
          setSeller(sellerData);
          setTokenState(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        removeAuthToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token: authToken, seller: sellerData } = await authAPI.login(email, password);
      setAuthToken(authToken);
      setTokenState(authToken);
      setSeller(sellerData);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const register = async (sellerData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    businessName: string;
    address: string;
  }) => {
    try {
      const { token: authToken, seller: newSeller } = await authAPI.register(sellerData);
      setAuthToken(authToken);
      setTokenState(authToken);
      setSeller(newSeller);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    removeAuthToken();
    setTokenState(null);
    setSeller(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      seller,
      token,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 