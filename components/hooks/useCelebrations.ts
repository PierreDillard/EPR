import { useState, useEffect, useCallback } from 'react';
import { toast, useToast } from '@/hooks/use-toast';
import { getCelebrationById, getCelebrations } from '@/lib/celebrations';
import type { Celebration } from '@/types/celebrations';

export const useCelebrations = () => {
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await getCelebrations();
        
        if (error) throw error;
        if (data) setCelebrations(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Erreur inattendue'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCelebrations();
  }, []);

  return { celebrations, isLoading, error };
};

