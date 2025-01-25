/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import {
Users, 
Heart, 
UnlockKeyhole, 
BookOpen, 
Globe, 
Eye,
Book
} from "lucide-react";
import Script from "next/script";
import { StructuredDataVision } from "@/lib/structuredData/vision";
import SectionTitle from "./section-title";
import { setEventTime } from '../../utils/eventsDate';
import { Separator } from '@/components/ui/separator';
import Quote from'@/components/ui/quote';


export default function Vision() {
    const visionCards = [
    {
      title: "ATTEINDRE",
      description: "Évangélisation, Témoignage",
      bgColor: "bg-[#00AECE]",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "RESTAURER",
      description: "Guérisons intérieure, Identité, Amour du Père",
      bgColor: "bg-[#A8CC3D]",
      icon: <Heart className="h-8 w-8" />
    },
    {
      title: "LIBÉRER",
      description: "Délivrance, Sanctification, Caractère",
      bgColor: "bg-[#FDAC00]",
      icon: <UnlockKeyhole className="h-8 w-8" />
    },
    {
      title: "ÉQUIPER",
      description: "Parole de Dieu, Dons de l'Esprit, Ministères",
      bgColor: "bg-white border-2 border-black",
      icon: <BookOpen className="h-8 w-8 text-[#000000]" />
    },
    {
      title: "ENVOYER",
      description: "Le principal commandement de Jésus",
      bgColor: "bg-[#0A0A0A]",
      icon: <Globe className="h-8 w-8" />
    }
  ];

  const structuredData = StructuredDataVision(visionCards);

  return (
    <section id="vision" className="py-8 md:py-16 bg-gray-50">
         <Script type="application/ld+json" id="json-ld-vision">
                {JSON.stringify(structuredData)}
            </Script>

      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
      <SectionTitle
        title="Notre Vision"
        color="#00AECE"
        subtitle=""
        icon={BookOpen}
        iconClassName="text-[#00AECE]"
      />
         <div className="!max-w-3xl  not-prose">
            <p className="text-left text-lg text-gray-600 mb-6">
              <span className="font-medium">Ensemble pour le Royaume</span> est une association qui a pour vocation de rassembler 
              des chrétiens de différentes dénominations, horizons ou cultures, afin de 
              participer ensemble à l'avancement du Royaume de Dieu dès ici-bas.
            </p>
            <p className="text-left text-lg text-gray-600 mb-6">
              Elle est appelée à proclamer la bonne nouvelle du royaume (Mat 4:23), 
              à manifester la puissance du royaume (I Cor 4:20) et à produire les 
              fruits du royaume (Rom 14:17; Gal 5:22).
            </p>
            <p className="text-left text-lg text-gray-600">
              Dans le respect de ses partenaires, elle œuvre 'en réseau', comme dans 
              le Nouveau Testament, et collabore avec l'ensemble du 'corps de Christ' 
              au travers des <span className="font-medium">5 ministères</span> (apôtres, prophètes, 
              évangélistes, pasteurs, et enseignants).
            </p>
        
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {visionCards.map((card, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-300">
              <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <div className={`inline-flex justify-center items-center w-16 h-16 rounded-full ${card.bgColor} text-white`}>
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-600 text-center text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-slate lg:prose-xl mt-8">
        <Quote 
  text="C'est en cultivant la culture du Royaume que nous encourageons chaque chrétien à s'investir dans sa ville, son église locale et sa nation."
  highlightedText="la culture du Royaume"
  gradientColors={{
    from: '#00AECE', // Bleu clair
    via: '#0096B7', // Bleu moyen
    to: '#006C8F'   // Bleu foncé
  }}
  className="w-full text-md md:text-lg mt-4"
/>
        </div>
      </div>
    </section>
  );
}