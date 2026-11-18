import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient.js';
import { 
  signInWithPassword,
  signOutFromSupabase,
} from '../services/authService.js'

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase){
      setLoading(false);
      return;
    }

    const {data} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  },[])

  async function signIn(email, password) {
    const {error} = await signInWithPassword(email, password);
    return { error };
  }

  async function signOut() {
    // Aquí va la llamada a Supabase para cerrar sesión.
    const { error } = await signOutFromSupabase();
    return {error}
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, signIn, signOut, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
