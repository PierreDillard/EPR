import Image from "next/image";
import { MapPin, Clock, Calendar, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from '@/types/event';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getBadgeColor } from '../../../utils/event';


export default function EventCard({
  title,
  date,
  time,
  location,
  image,
  type,
  speaker
}: Event) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Card className="relative overflow-hidden h-[400px] transition-all duration-500 rounded-3xl bg-black/50 group hover:cursor-pointer">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Contenu */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        {/* En-tête avec fond */}
        <div className="p-3 rounded-lg bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            {isDesktop ? (
              <>
                <Badge className={getBadgeColor(type)}>
                  {type.toUpperCase()}
                </Badge>
                <h3 className="text-lg md:text-lg font-bold text-gray-100 tracking-tight drop-shadow-lg">
                  {title}
                </h3>
              </>
            ) : (
              <h3 className="text-lg font-bold text-gray-100 tracking-tight drop-shadow-lg">
                {title || type.charAt(0).toUpperCase() + type.slice(1)}
              </h3>
            )}
          </div>
          <div className="w-16 h-1 bg-white rounded-full" />
        </div>

        {/* Informations avec fond */}
        <div className="space-y-2 p-3 rounded-lg bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Calendar className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-gray-100 font-medium">
              {new Date(date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {time && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <Clock className="h-5 w-5 text-gray-100" />
              </div>
              <span className="text-white font-medium">{time}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <MapPin className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-white font-medium">{location}</span>
          </div>

          {speaker && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <User className="h-5 w-5 text-gray-100" />
              </div>
              <span className="text-gray-100 font-medium">{speaker}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

