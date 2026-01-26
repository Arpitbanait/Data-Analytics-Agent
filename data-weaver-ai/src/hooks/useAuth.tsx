import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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
  id: 'mock-user-id',
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

    // Real Supabase auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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

    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    
    return { error: error as Error | null };
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (USE_MOCK_AUTH) {
      // Mock logout
      setSession(null);
      setUser(null);
      localStorage.removeItem('mock_user_email');
      return;
    }

    await supabase.auth.signOut();
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
