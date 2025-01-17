import { Video, VideoProps, PredicationData } from '@/types/predications';
import { supabase } from './supabaseClient';

export interface VideosResponse {
  formattedVideos: VideoProps[];
  rawData: PredicationData[];
}

export async function getVideos(): Promise<VideosResponse> {
  try {
    const { data, error } = await supabase
      .from('predications')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    const rawData = data as PredicationData[];
    
    // Format pour l'affichage (VideoProps)
    const formattedVideos: VideoProps[] = rawData.map(video => ({
      id: video.id.toString(), // Conversion en string pour VideoProps
      title: video.titre,
      date: new Date(video.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      thumbnail: video.miniature || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`,
      description: video.description
    }));

    return {
      formattedVideos,
      rawData
    };
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