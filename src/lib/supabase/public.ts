import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Client stateless untuk query data publik tanpa ketergantungan cookies/sesi auth
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes('your-project-id')) {
    return null;
  }

  return createSupabaseClient(url, anonKey);
}
