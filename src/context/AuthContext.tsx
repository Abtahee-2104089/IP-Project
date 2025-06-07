import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { getCurrentUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // For static data, we'll initialize with a default user
    return getCurrentUser();
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string, role: string = 'student'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For static data, we'll set the user based on the role
    const mockUser: User = {
      id: 'u1',
      name: 'Alex Johnson',
      email: email,
      role: role as 'student' | 'club-admin' | 'admin',
      department: 'Computer Science',
      year: 2,
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      registeredEvents: ['e1', 'e2', 'e4']
    };
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For static data, registration always succeeds
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}