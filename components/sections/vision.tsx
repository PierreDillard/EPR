'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Users, Heart, Network } from "lucide-react"

const visionPoints = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Proclamer",
    description: "Proclamer la bonne nouvelle du royaume (Mat 4:23)",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Manifester",
    description: "Manifester la puissance du royaume (I Cor 4:20)",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Produire",
    description: "Produire les fruits du royaume (Rom 14:17; Gal 5:22)",
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: "Collaborer",
    description: "Œuvrer en réseau avec l'ensemble du corps de Christ",
  },
]

export default function Vision() {
  return (
    <section id="vision" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold my-6">Notre Vision</h2>
          <div className="space-y-6 text-lg text-gray-600 max-w-3xl mx-auto">
          <Separator className="mx-auto w-1/4 bg-gray-300 my-10" />
            <p className="text-left">
              Ensemble pour le Royaume est une association qui a pour vocation de rassembler 
              des chrétiens de différentes dénominations, horizons ou cultures, afin de 
              participer ensemble à l'avancement du Royaume de Dieu dès ici-bas.
            </p>
         
            <p className="text-left">
              Elle est appelée à proclamer la bonne nouvelle du royaume (Mat 4:23), 
              à manifester la puissance du royaume (I Cor 4:20) et à produire les 
              fruits du royaume (Rom 14:17; Gal 5:22).
            </p>
        
            <p className="text-left">
              Dans le respect de ses partenaires, elle œuvre 'en réseau', comme dans 
              le Nouveau Testament, et collabore avec l'ensemble du 'corps de Christ' 
              au travers des 5 ministères (apôtres, prophètes, évangélistes, pasteurs, 
              et enseignants).
            </p>
            <Separator className="mx-auto w-1/4 bg-gray-300 my-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {visionPoints.map((point, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mx-auto w-1/3 bg-gray-300 mb-16" />

        <div className="text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            C'est en cultivant "la culture du Royaume" que nous encourageons chaque chrétien 
            à s'investir dans sa ville, son église locale et sa nation.
          </p>
        </div>
      </div>
    </section>
  )
}