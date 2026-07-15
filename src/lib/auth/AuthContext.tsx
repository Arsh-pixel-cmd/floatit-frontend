import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useBuilderStore } from '../builderStore';

// ─── Context ────────────────────────────────────────────────
export interface AuthContextType {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (data: any) => Promise<any>;
  signIn: (credentials: any) => Promise<any>;
  signOut: () => Promise<any>;
  getProfile: (userId: any) => Promise<any>;
  updateProfile: (userId: any, data: any) => Promise<any>;
  getAccessToken: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────
export const AuthProvider = ({ children, adapter }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true by default to prevent flash

  // Bootstrap: check for existing session on mount
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const { session } = await adapter.getSession();
        if (!cancelled) {
          if (session) {
            setUser(session.user);
          }
        }
      } catch (err) {
        console.error('[AuthProvider] bootstrap error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Listen for auth state changes (login/logout in other tabs, token refresh)
    const { unsubscribe } = adapter.onAuthStateChange((event: any, session: any) => {
      if (!cancelled) {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
          setUser(session?.user || null);
        } else if (event === 'INITIAL_SESSION' && session) {
          setUser(session.user);
        }
        setLoading(false);
      }
    });

    bootstrap();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [adapter]);

  // ─── Auth Methods (pass-through to adapter, with state sync) ───

  const signUp = useCallback(async (data: any) => {
    const result = await adapter.signUp(data);
    if (result.user && !result.error) {
      setUser(result.user);
    }
    return result;
  }, [adapter]);

  const signIn = useCallback(async (credentials: any) => {
    const result = await adapter.signIn(credentials);
    if (result.user && !result.error) {
      setUser(result.user);
    }
    return result;
  }, [adapter]);

  const signOut = useCallback(async () => {
    const result = await adapter.signOut();
    if (!result.error) {
      // Clear store canvas state to prevent leak to other users
      try {
        useBuilderStore.getState().resetCanvas();
      } catch (e) {
        console.error('Failed to reset canvas on sign out:', e);
      }
      localStorage.removeItem('active_sequence_id');
      localStorage.removeItem('use_default_key');
      localStorage.removeItem('agentic_model');
      localStorage.removeItem('currentPage');
      setUser(null);
    }
    return result;
  }, [adapter]);

  const getProfile = useCallback(async (userId: any) => {
    return adapter.getProfile(userId);
  }, [adapter]);

  const updateProfile = useCallback(async (userId: any, data: any) => {
    return adapter.updateProfile(userId, data);
  }, [adapter]);

  const getAccessToken = useCallback(async () => {
    return adapter.getAccessToken();
  }, [adapter]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    getProfile,
    updateProfile,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth() must be used within an <AuthProvider>');
  }
  return context;
};

// ─── Protected Route ────────────────────────────────────────
export const ProtectedRoute = ({ children }: any) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#A259FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.landing} replace />;
  }

  return children;
};
