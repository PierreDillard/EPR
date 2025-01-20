
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Evenement, EvenementInfo } from '@/types/event';

const supabase = createClientComponentClient();

export async function fetchEvenements(): Promise<Evenement[]> {
  try {
    const { data, error } = await supabase
      .from('evenements')
      .select(`
        *,
        infos: evenements_infos (*)
      `)
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
}

export async function fetchEvenementsAVenir(): Promise<Evenement[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('evenements')
      .select(`
        *,
        infos: evenements_infos (*)
      `)
      .gte('date', today)
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
}

export async function handleAddEvenement(
  evenement: Omit<Evenement, 'id'>,
  infos?: Omit<EvenementInfo, 'id' | 'evenement_id'>
) {
  const { data, error } = await supabase
    .from('evenements')
    .insert([{ ...evenement }])
    .select(); // Pour récupérer l'ID inséré

  if (error) {
    console.error('Erreur lors de l\'ajout de l\'événement:', error);
    throw error;
  }

  if (infos) {
    const evenementId = data?.[0]?.id;
    if (evenementId) {
      const { error: infosError } = await supabase
        .from('evenements_infos')
        .insert([{ ...infos, evenement_id: evenementId }]);

      if (infosError) {
        console.error('Erreur lors de l\'ajout des informations de l\'événement:', infosError);
        throw infosError;
      }
    }
  }

  return data;
}


export async function updateEvenement(
  id: string,
  evenement: Partial<Omit<Evenement, 'id'>>,
  infos?: Partial<Omit<EvenementInfo, 'id' | 'evenement_id'>>
) {
  const { error } = await supabase
    .from('evenements')
    .update(evenement)
    .eq('id', id);

  if (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    throw error;
  }

  if (infos) {
    const { error: infosError } = await supabase
      .from('evenements_infos')
      .update(infos)
      .eq('evenement_id', id);

    if (infosError) {
      console.error('Erreur lors de la mise à jour des informations de l\'événement:', infosError);
      throw infosError;
    }
  }
}

export async function handleDeleteEvenement(id: string) {
  try {
    const { error } = await supabase
      .from('evenements')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement:", error);
    throw error;
  }
}