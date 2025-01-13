import { useState, useEffect } from 'react';
import { fetchCelebrations } from '@/app/admin/actions/celebrations';
import type { Celebration } from '@/types/celebrations';

export const useCelebrations = () => {
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCelebrations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCelebrations(); 
        setCelebrations(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Erreur inattendue'));
      } finally {
        setIsLoading(false);
      }
    };

    loadCelebrations();
  }, []);

  return { celebrations, isLoading, error };
};
