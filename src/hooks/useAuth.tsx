
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<void>;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: BACKEND INTEGRATION POINT
    // Replace localStorage check with JWT token validation
    console.log('🔧 BACKEND TODO: Replace localStorage auth check with JWT validation');
    
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('userData');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: BACKEND INTEGRATION POINT
    // Replace with actual API call to POST /api/auth/login
    console.log('🔧 BACKEND TODO: Replace mock login with API call to /api/auth/login');
    console.log('Expected API call:', { email, password });
    
    // MOCK IMPLEMENTATION - REPLACE WITH REAL API CALL
    const mockUser = {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe'
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(mockUser));
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const signup = async (userData: SignupData) => {
    // TODO: BACKEND INTEGRATION POINT
    // Replace with actual API call to POST /api/auth/signup
    console.log('🔧 BACKEND TODO: Replace mock signup with API call to /api/auth/signup');
    console.log('Expected API call:', userData);
    
    // MOCK IMPLEMENTATION - REPLACE WITH REAL API CALL
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
  };

  const logout = () => {
    // TODO: BACKEND INTEGRATION POINT
    // Add API call to invalidate JWT token on server
    console.log('🔧 BACKEND TODO: Add API call to invalidate JWT token');
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
