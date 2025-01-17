import { useState, useEffect } from 'react';
import { getVideos } from '@/lib/videos';
import { VideoProps, PredicationData } from '@/types/predications';

export function useVideos() {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [rawData, setRawData] = useState<PredicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await getVideos();
        setVideos(response.formattedVideos);
        setRawData(response.rawData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return { videos, rawData, isLoading, error };
}