import Image from "next/image";
import { MapPin, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from "@/lib/utils/utils";

interface MeetingCardProps {
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
}

export default function MeetingCard({
  title,
  image,
  date = "Tous les vendredis",
  time = "19h30",
  location = "Dans la salle des préados"
}: MeetingCardProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <Card className="relative overflow-hidden h-[400px] transition-all duration-500 rounded-3xl">
      {/* Image de fond avec luminosité ajustée */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className={cn(
         "object-cover transition-transform duration-500 scale-110",
  "brightness-[0.95] md:brightness-[0.85]"
          )}
        />
        {/* Gradients ajustés pour une meilleure lisibilité */}
        <div 
     className={cn(
      "absolute inset-0 bg-gradient-to-t",
      isMobile 
        ? "from-black/70 via-black/40 to-black/5" 
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

      {/* Contenu avec contraste amélioré */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        {/* En-tête */}
        <div className="space-y-2">
          <h3 className={cn(
            "font-bold text-white tracking-tight drop-shadow-lg",
            "text-2xl md:text-3xl",
            "drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          )}>
            {title}
          </h3>
          <div className="w-16 h-1 bg-white/90 rounded-full" />
        </div>

        {/* Informations avec meilleur contraste */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className={cn(
              "text-white font-medium",
              "text-base md:text-lg",
              "drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            )}>
              {date}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className={cn(
              "text-white font-medium",
              "text-base md:text-lg",
              "drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            )}>
              {time}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/15 backdrop-blur-md">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className={cn(
              "text-white font-medium",
              "text-base md:text-lg",
              "drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            )}>
              {location}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}