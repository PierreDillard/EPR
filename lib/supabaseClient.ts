import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Les variables d'environnement Supabase ne sont pas configurées.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Singleton client-side — évite les instances multiples GoTrueClient
export const clientSupabase = createClientComponentClient();
