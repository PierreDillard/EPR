import { Card } from "@/components/ui/card";
import { MapPin, Clock, Calendar } from "lucide-react";
import OptimizedImage from "@/components/ui/optimized-image";
import { CelebrationProps } from "@/types/celebrations";
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils/utils';

const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || 'https://206.189.23.60';

export default function CelebrationCard({ 
  lieu, 
  adresse, 
  horaire, 
  jour,
  image = `${baseUrl}/images/event.webp`
}: CelebrationProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const imageSize = isMobile ? 'w-[640px] h-[360px]' : 'w-[1080px] h-[720px]';

  return (
    <Card className="relative overflow-hidden h-full transition-all duration-500 rounded-3xl">
      {/* Image de fond optimisée avec luminosité ajustée */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={image}
          alt={lieu}
          className={`${imageSize} object-cover transition-transform duration-500 scale-110 brightness-[0.95] md:brightness-[0.85]`}
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
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-lg">
            Culte
          </h3>
          <div className="w-16 h-1 bg-white/90 rounded-full" />
        </div>

        <div className="space-y-4">
          {/* Information containers avec meilleur contraste */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium drop-shadow-md text-base md:text-lg">
              {jour}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium drop-shadow-md text-base md:text-lg">
              {horaire}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium drop-shadow-md text-base md:text-lg">
              {lieu} {adresse}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}