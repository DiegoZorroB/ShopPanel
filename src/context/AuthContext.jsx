import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient.js';
import {
  signInWithPassword,
  signOutFromSupabase,
} from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Verifica la sesión inicial al cargar/recargar la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escucha cambios de autenticación (login / logout)
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function signIn(email, password) {
    const { error } = await signInWithPassword(email, password);
    return { error };
  }

  async function signOut() {
    const { error } = await signOutFromSupabase();
    return { error };
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signIn,
        signOut,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}