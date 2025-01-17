
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error("Les variables d'environnement Supabase ne sont pas configurées.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
