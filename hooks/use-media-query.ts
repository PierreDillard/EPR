import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Définir la correspondance initiale
    setMatches(media.matches);

    // Callback pour les changements de taille d'écran
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Ajouter l'écouteur d'événements
    media.addEventListener('change', listener);

    // Nettoyage
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}