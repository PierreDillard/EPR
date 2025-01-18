import { VideoProps, PredicationData } from '@/types/predications';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface VideosResponse {
  formattedVideos: VideoProps[];
  rawData: PredicationData[];
}

// Créer une instance Supabase réutilisable
const createSupabase = () => createClientComponentClient();

// Fonction utilitaire pour formater la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Fonction utilitaire pour générer l'URL de la miniature
const getThumbnailUrl = (miniature: string | null, youtubeId: string): string => {
  return miniature || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
};

export async function getVideos(): Promise<VideosResponse> {
  const supabase = createSupabase();
  
  try {
    const { data: videos, error } = await supabase
      .from('predications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const rawData = videos as PredicationData[];
    
    const formattedVideos: VideoProps[] = rawData.map(video => ({
      id: video.youtube_id,
      title: video.titre,
      date: formatDate(video.date),
      thumbnail: getThumbnailUrl(video.miniature, video.youtube_id),
      description: video.description,
      duration: video.duration
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

export async function addVideo(predicationData: Partial<PredicationData>): Promise<PredicationData> {
  const supabase = createSupabase();
  
  try {
    const { data, error } = await supabase
      .from('predications')
      .insert([predicationData])
      .single();

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la prédication:', error);
    throw error;
  }
}

export async function deleteVideo(id: string): Promise<void> {
  const supabase = createSupabase();
  
  try {
    const { error } = await supabase
      .from('predications')
      .delete()
      .eq('youtube_id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Erreur lors de la suppression de la prédication:', error);
    throw error;
  }
}

// Fonction pour récupérer une seule vidéo
export async function getVideo(id: string): Promise<PredicationData> {
  const supabase = createSupabase();
  
  try {
    const { data, error } = await supabase
      .from('predications')
      .select('*')
      .eq('youtube_id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Vidéo non trouvée');
    
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la prédication:', error);
    throw error;
  }
}