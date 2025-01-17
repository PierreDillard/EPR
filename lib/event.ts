
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Evenement, EvenementInfo } from '@/types/event';

const supabase = createClientComponentClient();

export async function fetchEvenements() {
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

export async function fetchEvenementsAVenir() {
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
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`/api/admin/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({ evenement, infos })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'événement:', error);
    throw error;
  }
}

export async function handleUpdateEvenement(
  id: string,
  evenement: Partial<Omit<Evenement, 'id'>>,
  infos?: Partial<Omit<EvenementInfo, 'id' | 'evenement_id'>>
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`${baseUrl}/api/admin/events`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({ id, evenement, infos })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    throw error;
  }
}

export async function handleDeleteEvenement(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`${baseUrl}/api/admin/events?id=${id}`, {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la suppression');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    throw error;
  }
}