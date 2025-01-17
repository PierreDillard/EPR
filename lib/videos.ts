import { VideoProps, PredicationData } from '@/types/predications';
import { supabase } from './supabaseClient';

export async function getVideos() {
  try {
    const { data, error } = await supabase
      .from('predications')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    // Formatter les données pour l'affichage
    const formattedVideos: VideoProps[] = (data as PredicationData[]).map(video => ({
      id: video.youtube_id,
      title: video.titre,
      date: new Date(video.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      thumbnail: video.miniature || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`
    }));

    return { data: formattedVideos, rawData: data };
  } catch (error) {
    console.error('Erreur lors de la récupération des prédications:', error);
    throw error;
  }
}

export async function addVideo({ 
  youtube_id, 
  titre, 
  description, 
  date,
  duration 
}: {
  youtube_id: string;
  
  titre: string;
  description?: string;
  date: string;
  duration?: string;
}) {
  const { data, error } = await supabase
    .from('videos')
    .insert([{ 
      youtube_id,
      titre,
      description,
      date,
      duration
    }]);

  if (error) {
    console.error('Error adding video:', error);
    throw error;
  }

  return data;
}