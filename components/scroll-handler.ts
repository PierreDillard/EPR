'use client';

import { useEffect } from 'react';

export default function ScrollHandler() {
  useEffect(() => {
    // Gérer le scroll initial si l'URL contient un hash
    const handleInitialScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Gérer les clics sur les liens internes
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor?.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        const section = document.querySelector(anchor.hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState({}, '', anchor.hash);
        }
      }
    };

    // Ajouter les event listeners
    handleInitialScroll();
    document.addEventListener('click', handleLinkClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
}