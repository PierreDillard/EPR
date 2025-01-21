
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
export async function getCelebrationById(id: number): Promise<Celebration> {
  const { data, error } = await supabase
    .from('celebrations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Erreur lors de la récupération de la célébration : ${error.message}`);
  }

  if (!data) {
    throw new Error('Célébration non trouvée');
  }

  return data;
}

export async function updateCelebration(
  id: number, 
  updateData: Partial<Celebration>
): Promise<Celebration> {
  const { data, error } = await supabase
    .from('celebrations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de la mise à jour de la célébration : ${error.message}`);
  }

  if (!data) {
    throw new Error('Célébration non trouvée après mise à jour');
  }

  return data;
}