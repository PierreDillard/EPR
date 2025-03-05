import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Meditation {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export function MeditationCard({ meditation }: { meditation: Meditation }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Fonction pour extraire un court extrait du contenu HTML
  const createExcerpt = (htmlContent: string, maxLength = 120) => {
    // Créer un élément temporaire pour parser le HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Obtenir le texte brut
    const textContent = tempDiv.textContent || '';
    
    // Tronquer le texte
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[75vh] group overflow-hidden rounded-xl shadow-xl">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 w-full h-full">
        {meditation.image_url ? (
          <OptimizedImage
            src={meditation.image_url}
            alt={meditation.title}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full w-full flex items-center justify-center">
            <Sparkles className="h-20 w-20 text-white" />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />
      </div>

      {/* Contenu */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white z-10">
        <div className="max-w-3xl mx-auto">
          {/* Date avec icône */}
          <div className="flex items-center space-x-2 mb-4 opacity-90">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-light">{formatDate(meditation.created_at)}</span>
          </div>
          
          {/* Titre */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            {meditation.title}
          </h2>
          
          {/* Extrait du contenu */}
          <p className="text-base md:text-lg text-gray-100 mb-6 md:mb-8 leading-relaxed opacity-90">
            {typeof window !== 'undefined' 
              ? createExcerpt(meditation.content) 
              : "Chargement de la méditation..."}
          </p>
          
          {/* Bouton Découvrir */}
          <Link href={`/meditations/${meditation.id}`} passHref>
            <Button 
              size="lg"
              className="group bg-white text-black hover:bg-[#00AECE] hover:text-white transition-all duration-300 rounded-full px-8"
            >
              <span className="mr-2">Découvrir</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Logo/Icône en haut de l'image */}
      <div className="absolute top-6 right-6 bg-[#00AECE] rounded-full p-3 shadow-lg z-10">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}