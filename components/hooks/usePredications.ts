import { useState, useEffect } from 'react';
import { fetchPredications } from '@/app/admin/actions/predications';
import type { VideoProps } from '@/types/predications';

export const usePredications = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPredications = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPredications();
        setVideos(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Erreur inattendue'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPredications();
  }, []);

  return { videos, isLoading, error };
};
