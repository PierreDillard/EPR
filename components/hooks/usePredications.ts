import { useState, useEffect } from 'react';
import { getVideos } from '@/lib/videos';
import { VideoProps } from '@/types/predications';

export function usePredications() {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await getVideos();
        setVideos(response.formattedVideos);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
        setIsLoading(false);
      }
    }
    
    fetchVideos();
  }, []);

  return { videos, isLoading, error };
}