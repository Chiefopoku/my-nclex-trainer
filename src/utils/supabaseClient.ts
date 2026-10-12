import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
}

let studentIdPromise: Promise<string | null> | null = null;

/**
 * Returns the current student's id, creating a private anonymous session on
 * first visit so each visitor gets their own progress. Returns null if
 * Supabase isn't configured or anonymous sign-in is disabled; the app still
 * works, it just can't save progress.
 */
export function getStudentId(): Promise<string | null> {
  if (studentIdPromise) return studentIdPromise;
  studentIdPromise = (async () => {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data } = await client.auth.getSession();
      if (data.session?.user?.id) return data.session.user.id;
      const { data: signIn, error } = await client.auth.signInAnonymously();
      if (error || !signIn.user) return null;
      return signIn.user.id;
    } catch {
      return null;
    }
  })();
  return studentIdPromise;
}
