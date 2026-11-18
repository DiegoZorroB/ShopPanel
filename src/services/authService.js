import { supabase } from './supabaseClient.js';

export async function signInWithPassword(email, password) {
  // Aquí va la petición de inicio de sesión con correo y contraseña.
  if (!supabase) return { data: null, error: new Error('Faltan las variables de Supabase.') };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutFromSupabase() {
  // Aquí va el cierre de sesión con Supabase.
  if (!supabase) return { error: new Error('Faltan las variables de Supabase.') };
  return supabase.auth.signOut();
}
