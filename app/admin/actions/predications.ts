import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Predication {
  id: number;
  titre: string;
  miniature: string;
  video_id: string;
  created_at: string;
}

const supabase = createClientComponentClient();

export async function fetchPredications(): Promise<Predication[]> {
  const { data, error } = await supabase
    .from('predications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors du chargement des prédications:', error);
    throw new Error('Erreur lors du chargement des prédications');
  }

  return data || [];
}

export async function deletePredicationById(predicationId: number): Promise<void> {
  const { error } = await supabase
    .from('predications')
    .delete()
    .eq('id', predicationId);

  if (error) {
    console.error('Erreur lors de la suppression de la prédication:', error);
    throw new Error('Erreur lors de la suppression de la prédication');
  }
}

export async function addPredication(newPredication: Predication): Promise<void> {
  const { error } = await supabase
    .from('predications')
    .insert([newPredication]);

  if (error) {
    console.error('Erreur lors de l\'ajout de la prédication:', error);
    throw new Error('Erreur lors de l\'ajout de la prédication');
  }
}
