import { supabase } from './supabaseClient';

export async function getVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('date', { ascending: false });
    
  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
  
  return data;
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