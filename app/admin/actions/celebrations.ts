import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface CelebrationFormData {
  lieu: string;
  adresse: string;
  horaire: string;
  jour: string;
}

const supabase = createClientComponentClient();

export async function fetchCelebrationById(celebrationId: number): Promise<CelebrationFormData | null> {
  const { data, error } = await supabase
    .from('celebrations')
    .select('*')
    .eq('id', celebrationId)
    .single();

  if (error) {
    throw new Error('Erreur lors du chargement des données de la célébration');
  }

  return data
    ? {
        lieu: data.lieu,
        adresse: data.adresse,
        horaire: data.horaire,
        jour: data.jour,
      }
    : null;
}

export async function updateCelebration(celebrationId: number, formData: CelebrationFormData): Promise<void> {
  const { error } = await supabase
    .from('celebrations')
    .update(formData)
    .eq('id', celebrationId);

  if (error) {
    throw new Error('Erreur lors de la mise à jour de la célébration');
  }
}
