'use client'
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Calendar, Video } from "lucide-react"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Content {
  predications: {
    id: number;
    titre: string;
    date: string;
    miniature: string;
    vues: number;
  }[];
  celebrations: {
    id: number;
    lieu: string;
    jour: 'Dimanche' | 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
    horaire: string;
    adresse: string;
  }[];
}

export default function LatestContent({ predications, celebrations }: Content) {
  // Trier les prédications par vues
  const topPredications = [...predications]
    .sort((a, b) => (b.vues || 0) - (a.vues || 0))
    .slice(0, 5);

  const upcomingCelebrations = celebrations
    .filter(celebration => {
      // Vérifier si la célébration est à venir en fonction du jour
      const jourMap = {
        'Dimanche': 0, 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3,
        'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6
      };
      const today = new Date().getDay();
      const celebDay = jourMap[celebration.jour as keyof typeof jourMap];
      return celebDay >= today;
    })
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Top Prédications */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Prédications les plus vues</h2>
          <div className="space-y-4">
            {topPredications.map((predication) => (
              <div key={predication.id} className="flex items-center gap-4">
                <div className="relative w-16 h-12">
                  <Image 
                    src={predication.miniature} 
                    alt={predication.titre}
                    className="object-cover rounded"
                  />
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                    {predication.vues || 0} vues
                  </div>
                </div>
                <div>
                  <p className="font-medium truncate">{predication.titre}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(predication.date), 'PP', { locale: fr })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Prochaines Célébrations */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Prochaines célébrations</h2>
          <div className="space-y-4">
            {upcomingCelebrations.map((celebration) => (
              <div key={celebration.id} className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{celebration.lieu}</p>
                    <p className="text-sm font-medium text-green-600">
                      {celebration.horaire}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{celebration.jour}</p>
                  <p className="text-sm text-gray-500 truncate">{celebration.adresse}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}''