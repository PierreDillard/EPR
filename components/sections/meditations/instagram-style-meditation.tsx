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
    <div className="relative max-w-6xl mx-auto mb-20">
      {/* Image container - positionnée en haut */}
      <div className="relative z-10 w-full md:ml-auto aspect-square md:aspect-[16/9] shadow-md rounded-xl overflow-hidden">
        <OptimizedImage
          src={meditation.image_url || "/images/meditation-default.jpg"}
          alt={meditation.title}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Contenu textuel - décalé vers le haut et à gauche par rapport à l'image */}
      <Card className="relative z-20 w-full  bg-white shadow-xl border-0 overflow-hidden mt-[-40px] md:mt-[-180px] md:ml-6">
        <div className="p-8 md:p-10">
          {/* En-tête avec date et indicateur */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-gray-500">
              {formatDate(meditation.created_at)}
            </span>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-[#00AECE] rounded-full"></span>
              <span className="text-sm font-medium text-[#00AECE]">Méditation</span>
            </div>
          </div>
          
          {/* Titre avec une grande taille de police */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-6">
            {meditation.title}
          </h2>
          
          {/* Contenu complet */}
          <div className="prose prose-xl max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: meditation.content }} />
          </div>
          
          {/* Actions en bas */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Ensemble pour le Royaume
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}