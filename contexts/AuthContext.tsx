import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserProfile {
  name: string;
  location: string;
  method: 'mobile' | 'aadhaar';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (method: 'mobile' | 'aadhaar') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check local storage for persistence (optional, keeping it simple for demo)
    const storedAuth = localStorage.getItem('loan4farm_auth');
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedAuth));
    }
  }, []);

  const login = (method: 'mobile' | 'aadhaar') => {
    const mockUser: UserProfile = {
      name: "Ram Singh Ji",
      location: "Bhopur Village",
      method
    };
    setIsAuthenticated(true);
    setUser(mockUser);
    localStorage.setItem('loan4farm_auth', JSON.stringify(mockUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('loan4farm_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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