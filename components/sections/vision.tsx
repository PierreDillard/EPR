/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from "framer-motion";

import {
Users, 
Heart, 
UnlockKeyhole, 
BookOpen, 
Globe, 
Eye,
Book
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { StructuredDataVision } from "@/lib/structuredData/vision";
import SectionTitle from "./section-title";

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
        <div className="flex flex-col md:flex-row items-center gap-10 not-prose">
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-left text-base text-gray-600">
              <span className="font-semibold">Ensemble pour le Royaume</span> rassemble des chrétiens de différentes dénominations et cultures pour participer à l'avancement du Royaume de Dieu.
            </p>
            <p className="text-left text-base text-gray-600">
              Proclamer la bonne nouvelle (Mat 4:23), manifester la puissance du Royaume (I Cor 4:20) et produire ses fruits (Rom 14:17 ; Gal 5:22).
            </p>
            <p className="text-left text-base text-gray-600">
              Elle collabore 'en réseau' avec le 'corps de Christ' au travers des <span className="font-semibold">5 ministères</span> — apôtres, prophètes, évangélistes, pasteurs et enseignants.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/vision.png"
              alt="Ensemble pour le Royaume"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
  {visionCards.map((card, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center shadow-sm hover:shadow-md">
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`inline-flex justify-center items-center w-16 h-16 rounded-full ${card.bgColor} text-white`}>
            {card.icon}
          </div>
        </motion.div>
        <h3 className="text-xl font-bold mb-4">{card.title}</h3>
        <p className="text-gray-600 text-center text-sm">{card.description}</p>
      </div>
    </motion.div>
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