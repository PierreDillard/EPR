
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Evenement, EvenementComplet, EvenementInfo, EventStats } from '@/types/event';

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

export async function fetchEvenementsAVenir(): Promise<EvenementComplet[]> {
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
    // Démarrer une transaction
    const { data: eventData, error: eventError } = await supabase
      .from('evenements')
      .insert([{ ...evenement }])
      .select()
      .single();

    if (eventError) {
      console.error('Erreur lors de l\'ajout de l\'événement:', eventError);
      throw eventError;
    }

    if (infos && eventData?.id) {
      const { error: infosError } = await supabase
        .from('evenements_infos')
        .insert([{ 
          ...infos, 
          evenement_id: eventData.id 
        }]);

      if (infosError) {
        // En cas d'erreur, on supprime l'événement créé pour maintenir la cohérence
        await supabase
          .from('evenements')
          .delete()
          .eq('id', eventData.id);
          
        console.error('Erreur lors de l\'ajout des informations:', infosError);
        throw infosError;
      }
    }

    return eventData;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
  }
}


export async function updateEvenement(
  id: string,
  evenement: Partial<Omit<Evenement, 'id'>>,
  infos?: Partial<Omit<EvenementInfo, 'id' | 'evenement_id'>>
) {
  try {
    const { error: eventError } = await supabase
      .from('evenements')
      .update(evenement)
      .eq('id', id);

    if (eventError) {
      console.error('Erreur lors de la mise à jour de l\'événement:', eventError);
      throw eventError;
    }

    if (infos) {

      const { data: existingInfos } = await supabase
        .from('evenements_infos')
        .select()
        .eq('evenement_id', id)
        .maybeSingle();

      if (existingInfos) {
        // Mise à jour des infos existantes
        const { error: updateError } = await supabase
          .from('evenements_infos')
          .update(infos)
          .eq('evenement_id', id);

        if (updateError) {
          console.error('Erreur lors de la mise à jour des infos:', updateError);
          throw updateError;
        }
      } else {
        // Création de nouvelles infos
        const { error: insertError } = await supabase
          .from('evenements_infos')
          .insert([{ ...infos, evenement_id: id }]);

        if (insertError) {
          console.error('Erreur lors de la création des infos:', insertError);
          throw insertError;
        }
      }
    }

    // Récupérer et retourner l'événement mis à jour avec ses infos
    const { data: updatedEvent, error: fetchError } = await supabase
      .from('evenements')
      .select(`
        *,
        infos:evenements_infos (*)
      `)
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Erreur lors de la récupération de l\'événement mis à jour:', fetchError);
      throw fetchError;
    }

    return updatedEvent;
  } catch (error) {
    console.error('Erreur inattendue:', error);
    throw error;
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

export async function getEventStats(): Promise<EventStats> {

  const today = new Date().toISOString().split('T')[0]
  const currentMonth = new Date().getMonth() + 1

  try {

    const { data: events, error } = await supabase
      .from('evenements')
      .select('*')
      .order('date', { ascending: true })

    if (error) throw error


    const totalEvents = events?.length || 0
    const upcomingEvents = events?.filter(event => event.date >= today).length || 0
    const thisMonthEvents = events?.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() + 1 === currentMonth
    }).length || 0

    return {
      total: totalEvents,
      upcoming: upcomingEvents,
      thisMonth: thisMonthEvents
    }
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques des événements:', error)
    throw error
  }
}

