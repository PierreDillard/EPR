import { MapPin, Clock, Calendar, ExternalLink } from "lucide-react";
import OptimizedImage from "@/core/components/ui/optimized-image";
import { CelebrationProps } from "../types/celebrations.types";
import { useMediaQuery } from '@/core/hooks/use-media-query';
import { cn } from '@/core/utils/utils';



interface EnhancedCelebrationProps extends CelebrationProps {
  displayStyle?: 'standard' | 'featured' | 'dark';
  customTitle?: string;
  badgeText?: string;
}

export default function CelebrationCard({ 
  lieu, 
  adresse, 
  horaire, 
  jour,
  image = `/event.webp`,
  displayStyle = 'standard',
  customTitle,
  badgeText
}: EnhancedCelebrationProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Helper function to create Google Maps URL
  const getGoogleMapsUrl = () => {
    const fullAddress = `${lieu} ${adresse}`.trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  };
  
  // Si c'est le style "dark" (culte après midi)
  if (displayStyle === 'dark') {
    return (
      <div className="bg-gradient-to-br md:mt-12 from-[#1A1A1A] via-[#2C2C2C] to-[#333333] text-gray-100 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 h-full relative">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">{customTitle || "Culte après-midi"}</h3>
          <div className="flex items-center mb-3">
            <Calendar className="h-5 w-5 text-sky-300 mr-2" />
            <span className="text-sky-100">{jour}</span>
          </div>
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-sky-300 mr-2" />
            <span className="text-sky-100">{horaire}</span>
          </div>
          <div className="flex items-start mb-4">
            <MapPin className="h-5 w-5 text-sky-300 mr-2 mt-0.5" />
            <a 
              href={getGoogleMapsUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sky-100 hover:text-sky-300 flex items-center transition-colors"
            >
              <span>{lieu} {adresse}</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1 inline-flex" />
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // Si c'est le style "featured" (culte principal)
  if (displayStyle === 'featured') {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 h-full">
        <div className="h-64 overflow-hidden relative">
          <OptimizedImage 
            src={image} 
            alt={lieu} 
            className="w-full h-full object-cover" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="bg-sky-600 text-gray-100 px-3 py-1 text-sm font-medium rounded-full">
              {badgeText || "Culte Principal"}
            </span>
            <h3 className="text-gray-100 text-2xl font-bold mt-2">
              {customTitle || "Culte du Dimanche"}
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">{jour}</span>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">{horaire}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
            <a 
              href={getGoogleMapsUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 font-medium hover:text-sky-600 flex items-center transition-colors"
            >
              <span>{lieu} {adresse}</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1 inline-flex" />
            </a>
          </div>
          <div className="mt-6">
           {/*  <a href="#" className="inline-block bg-sky-600 text-gray-100 px-4 py-2 rounded-lg font-medium hover:bg-sky-700 transition-colors">
              En savoir plus
            </a> */}
          </div>
        </div>
      </div>
    );
  }
  
 
  return (
    <div className="relative overflow-hidden h-full transition-all duration-500 rounded-2xl shadow-lg">
      {/* Image de fond optimisée avec luminosité ajustée */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={image}
          alt={lieu}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 scale-110",
            "brightness-[0.95] md:brightness-[0.85]"
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Ajustement des dégradés pour une meilleure lisibilité */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            isMobile 
              ? "from-black/70 via-black/20 to-black/5" 
              : "from-black/60 via-black/10 to-transparent"
          )} 
        />
        {/* Overlay ajusté selon le device */}
        <div 
          className={cn(
            "absolute inset-0",
            isMobile ? "bg-black/10" : "bg-black/20"
          )} 
        />
      </div>

      {/* Contenu avec meilleur contraste */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight drop-shadow-lg">
            {customTitle || "Culte"}
          </h3>
          <div className="w-16 h-1 bg-white/90 rounded-full" />
        </div>

        <div className="space-y-4">
          {/* Information containers avec meilleur contraste */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <Calendar className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-gray-100 font-medium drop-shadow-md text-base md:text-lg">
              {jour}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <Clock className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-gray-100 font-medium drop-shadow-md text-base md:text-lg">
              {horaire}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <MapPin className="h-5 w-5 text-gray-100" />
            </div>
            <a 
              href={getGoogleMapsUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-100 font-medium drop-shadow-md text-base md:text-lg hover:text-sky-300 flex items-center transition-colors"
            >
              <span>{lieu} {adresse}</span>
              <ExternalLink className="h-4 w-4 ml-1.5 inline-flex" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
