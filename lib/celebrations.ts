
import { supabase } from './supabaseClient';
import type { Celebration } from '../types/celebrations';

export async function getCelebrations(): Promise<{ data: Celebration[] | null; error: Error | null }> {
    try {
  const { data, error } = await supabase
    .from('celebrations')
    .select('*')
    .order('id', { ascending: true });

    if (error) throw new Error(`Erreur lors de la récupération des célébrations : ${error.message}`);
    
    return { data, error: null };
  } catch (e) {
    console.error('Erreur inattendue:', e);
    throw e instanceof Error ? e : new Error('Erreur inattendue lors de la récupération des célébrations');
  }
}