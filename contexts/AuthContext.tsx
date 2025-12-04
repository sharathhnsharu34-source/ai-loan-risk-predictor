import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserProfile {
  name: string;
  location: string;
  method: 'mobile' | 'aadhaar';
  identifier: string;
  crop: string;
  loanStatus: 'Active' | 'None';
  loanAmount?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (method: 'mobile' | 'aadhaar', identifier: string) => void;
  logout: () => void;
  updateCrop: (crop: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('loan4farm_auth');
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedAuth));
    }
  }, []);

  const login = (method: 'mobile' | 'aadhaar', identifier: string) => {
    const mockUser: UserProfile = {
      name: "Ram Singh Ji",
      location: "Bhopur Village",
      method,
      identifier,
      crop: "Not Selected",
      loanStatus: 'Active',
      loanAmount: 75000
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

  const updateCrop = (crop: string) => {
    if (user) {
      const newUser = { ...user, crop };
      setUser(newUser);
      localStorage.setItem('loan4farm_auth', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateCrop }}>
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