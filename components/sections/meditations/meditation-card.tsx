import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/optimized-image";
import { Sparkles, FileText, Headphones, Type, Heart, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Meditation {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export function MeditationCard({ meditation }: { meditation: Meditation }) {
  // Définir un auteur par défaut si non fourni
  const author = meditation.author || {
    name: "EPR Team",
    avatar: "/images/default-avatar.jpg"
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      {/* Bannière principale */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-4">
        {meditation.image_url ? (
          <OptimizedImage
            src={meditation.image_url}
            alt={meditation.title}
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-gradient-to-r from-orange-300 to-amber-500 h-full w-full flex items-center justify-center">
            <Sparkles className="h-16 w-16 text-white" />
          </div>
        )}
        
        {/* Overlay avec titre */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-6">
          {/* Badge/logo coin supérieur gauche */}
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          
          {/* Titre en bas */}
          <div>
            <h3 className="text-white text-2xl font-bold drop-shadow-md">
              {meditation.title}
            </h3>
            <div className="bg-[#00AECE] text-white px-3 py-1 rounded-md w-fit mt-2 font-semibold">
              Méditation
            </div>
          </div>
        </div>
        
        {/* Bouton de lecture */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href={`/meditations/${meditation.id}`}>
            <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <PlayCircle className="h-10 w-10 text-white fill-white" />
            </button>
          </Link>
        </div>
      </div>
      
      {/* Menu d'actions */}
      <div className="flex justify-between bg-gray-50 rounded-xl p-4 mb-8">
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
          <span className="text-xs text-gray-600">PDF</span>
        </button>
        
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Sparkles className="h-5 w-5 text-[#00AECE]" />
          </div>
          <span className="text-xs text-gray-600">Audio</span>
        </button>
        
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Type className="h-5 w-5 text-gray-600" />
          </div>
          <span className="text-xs text-gray-600">Texte</span>
        </button>
        
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Headphones className="h-5 w-5 text-gray-600" />
          </div>
          <span className="text-xs text-gray-600">Écouter</span>
        </button>
        
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Heart className="h-5 w-5 text-gray-600" />
          </div>
          <span className="text-xs text-gray-600">Aimer</span>
        </button>
      </div>
      
      {/* Titre et auteur */}
      <div className="px-4">
        <h2 className="text-4xl font-bold text-center mb-6">{meditation.title}</h2>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
            <Image 
              src={author.avatar || "/images/default-avatar.jpg"} 
              alt={author.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <p className="text-gray-600">{author.name}</p>
        </div>
        
        {/* Aperçu du contenu */}
        <div 
          className="prose prose-gray max-w-none mb-6 line-clamp-4"
          dangerouslySetInnerHTML={{ 
            __html: meditation.content.substring(0, 300) + '...'
          }}
        />
        
        {/* Bouton de lecture complet */}
        <Link href={`/meditations/${meditation.id}`} className="block mb-12">
          <Button 
            className="w-full bg-[#00AECE] hover:bg-[#00AECE]/90 text-white"
          >
            Lire la méditation complète
          </Button>
        </Link>
      </div>
    </div>
  );
}