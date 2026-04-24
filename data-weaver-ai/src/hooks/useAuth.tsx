import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { authService } from '@/services/authService';

// Mock auth mode flag
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const createMockUser = (email: string): User => ({
  id: `mock-${email.trim().toLowerCase()}`,
  email,
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User);

const createMockSession = (email: string): Session => ({
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh-token',
  user: createMockUser(email),
} as Session);

// Helper to create JWT-based user from auth response
const createJWTUser = (userId: string, email: string, token: string): User => ({
  id: userId,
  email,
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User);

const createJWTSession = (userId: string, email: string, token: string): Session => ({
  access_token: token,
  token_type: 'bearer',
  expires_in: 86400, // 24 hours
  refresh_token: null,
  user: createJWTUser(userId, email, token),
} as Session);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK_AUTH) {
      // Mock auth: check localStorage for saved session
      const savedEmail = localStorage.getItem('mock_user_email');
      if (savedEmail) {
        const mockSession = createMockSession(savedEmail);
        setSession(mockSession);
        setUser(mockSession.user);
      }
      setLoading(false);
      return;
    }

    // JWT auth: check for stored token
    const token = authService.getStoredToken();
    if (token) {
      // In a real app, you'd verify the token here
      // For now, we'll just use it if it exists
      const storedEmail = localStorage.getItem('jwt_user_email');
      const storedUserId = localStorage.getItem('jwt_user_id');
      
      if (storedEmail && storedUserId) {
        const jwtSession = createJWTSession(storedUserId, storedEmail, token);
        setSession(jwtSession);
        setUser(jwtSession.user);
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (USE_MOCK_AUTH) {
      // Mock signup - just create a session
      const mockSession = createMockSession(email);
      setSession(mockSession);
      setUser(mockSession.user);
      localStorage.setItem('mock_user_email', email);
      return { error: null };
    }

    try {
      // JWT backend signup
      const response = await authService.signUp({ email, password });
      authService.saveToken(response.access_token);
      localStorage.setItem('jwt_user_email', response.email);
      localStorage.setItem('jwt_user_id', response.user_id);
      
      const jwtSession = createJWTSession(response.user_id, response.email, response.access_token);
      setSession(jwtSession);
      setUser(jwtSession.user);
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (USE_MOCK_AUTH) {
      // Mock login - accept any credentials
      const mockSession = createMockSession(email);
      setSession(mockSession);
      setUser(mockSession.user);
      localStorage.setItem('mock_user_email', email);
      return { error: null };
    }

    try {
      // JWT backend login
      const response = await authService.login({ email, password });
      authService.saveToken(response.access_token);
      localStorage.setItem('jwt_user_email', response.email);
      localStorage.setItem('jwt_user_id', response.user_id);
      
      const jwtSession = createJWTSession(response.user_id, response.email, response.access_token);
      setSession(jwtSession);
      setUser(jwtSession.user);
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (USE_MOCK_AUTH) {
      // Mock logout
      setSession(null);
      setUser(null);
      localStorage.removeItem('mock_user_email');
      return;
    }

    // JWT logout
    authService.removeToken();
    localStorage.removeItem('jwt_user_email');
    localStorage.removeItem('jwt_user_id');
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
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
