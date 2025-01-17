import Image from "next/image";
import { MapPin, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  return (
    <Card className="relative overflow-hidden h-[400px] transition-all duration-500 rounded-3xl"> {/* Hauteur fixe ajoutée */}
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-500 scale-110 blur-[1px]"
        />
        {/* Double overlay pour une meilleure profondeur et lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenu */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        {/* En-tête */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-lg">
            {title}
          </h3>
          <div className="w-16 h-1 bg-white rounded-full" />
        </div>

        {/* Informations */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium drop-shadow-md">{date}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium drop-shadow-md">{time}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-medium drop-shadow-md">{location}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}