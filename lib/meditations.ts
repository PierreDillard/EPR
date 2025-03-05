import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Meditation } from '@/types/meditations';

const supabase = createClientComponentClient();

export async function getLatestMeditations() {
  
  const { data: meditations } = await supabase
    .from('meditations')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4)
  
  return meditations || []
}


export async function getMeditations(): Promise<Meditation[]> {
  try {
    const { data, error } = await supabase
      .from('meditations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des méditations:', error);
    throw error;
  }
}

export async function getMeditationById(id: string): Promise<Meditation> {
  try {
    const { data, error } = await supabase
      .from('meditations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Méditation non trouvée');
    
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la méditation:', error);
    throw error;
  }
}

export async function createMeditation(meditation: Omit<Meditation, 'id'>): Promise<Meditation> {
  try {
    const { data, error } = await supabase
      .from('meditations')
      .insert([{
        ...meditation
    
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la création de la méditation:', error);
    throw error;
  }
}

export async function updateMeditation(id: string, meditation: Partial<Omit<Meditation, 'id' | 'created_at'>>): Promise<Meditation> {
  try {
    const { data, error } = await supabase
      .from('meditations')
      .update({
        ...meditation,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la méditation:', error);
    throw error;
  }
}

export async function deleteMeditation(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('meditations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Erreur lors de la suppression de la méditation:', error);
    throw error;
  }
}

export async function toggleMeditationPublished(id: string, currentState: boolean): Promise<Meditation> {
  try {
    const { data, error } = await supabase
      .from('meditations')
      .update({
        published: !currentState,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors du changement de statut de la méditation:', error);
    throw error;
  }
}