import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { EvenementInfo } from '@/types/event';

const supabase = createClientComponentClient();

export async function fetchEvenementInfos(evenement_id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`/api/admin/events-infos?evenement_id=${evenement_id}`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des infos:', error);
    throw error;
  }
}

export async function handleAddEvenementInfos(
  evenement_id: string, 
  infos: Omit<EvenementInfo, 'id' | 'evenement_id'>
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`/api/admin/events-infos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({ evenement_id, ...infos })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'ajout des infos:', error);
    throw error;
  }
}

export async function handleUpdateEvenementInfos(
  evenement_id: string,
  infos: Partial<Omit<EvenementInfo, 'id' | 'evenement_id'>>
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`/api/admin/events-infos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include',
      body: JSON.stringify({ evenement_id, ...infos })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la mise à jour des infos:', error);
    throw error;
  }
}

export async function handleDeleteEvenementInfos(evenement_id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    const response = await fetch(`/api/admin/events-infos?evenement_id=${evenement_id}`, {
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
    console.error('Erreur lors de la suppression des infos:', error);
    throw error;
  }
}