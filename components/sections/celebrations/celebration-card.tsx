
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { CelebrationProps } from "@/types/celebrations";

const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || 'https://206.189.23.60';

export default function CelebrationCard({ 
  lieu, 
  adresse, 
  horaire, 
  jour,
  image = `${baseUrl}/images/event.webp`
}: CelebrationProps) {
  return (
    <Card className="relative overflow-hidden h-full transition-all duration-500 rounded-3xl">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={lieu}
          fill
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
          <h3 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight drop-shadow-lg">
          Culte
          </h3>
          <div className="w-16 h-1 bg-white rounded-full" />
        </div>

        {/* Informations */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-gray-100 font-medium drop-shadow-md">{jour}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Clock className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-gray-100 font-medium drop-shadow-md">{horaire}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <MapPin className="h-5 w-5 text-gray-100" />
            </div>
            <span className="text-gray-100 font-medium drop-shadow-md">{ lieu} {adresse}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
