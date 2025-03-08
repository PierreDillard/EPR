import { Card } from "@/components/ui/card";
import OptimizedImage from "@/components/ui/optimized-image";


interface Meditation {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export function InstagramStyleMeditation({ meditation }: { meditation: Meditation }) {
  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="overflow-hidden border-0 ">
      <div className="flex flex-col md:flex-row">
        {/* Partie gauche - Image */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="relative aspect-square w-full">
            <OptimizedImage
              src={meditation.image_url || "/images/meditation-default.jpg"}
              alt={meditation.title}
              className="object-cover"
              priority
            />
            {/* Overlay pour assurer la lisibilité du texte */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
 
        </div>
        
        {/* Partie droite - Contenu */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white">
          {/* En-tête avec date */}
          <div className="mb-4 text-sm text-gray-500 font-medium">
            {formatDate(meditation.created_at)}
          </div>
          
          {/* Contenu principal */}
          <div className="space-y-6 flex-grow">
            <h2 className="text-2xl font-bold leading-snug text-gray-900">
              {meditation.title}
            </h2>
            
            <div 
              className="prose prose-lg max-h-64 " 
              dangerouslySetInnerHTML={{ __html: meditation.content }}
            />
          </div>
          
          {/* Pied de page */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Ensemble pour le Royaume
            </div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-[#00AECE] rounded-full"></span>
              <span className="text-sm font-medium text-[#00AECE]">Méditation</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}