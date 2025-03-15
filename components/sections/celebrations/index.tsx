'use client';

import { useCelebrations } from "@/components/hooks/useCelebrations";
import Script from "next/script";
import { StructuredDataCelebration } from "@/lib/structuredData/celebrations";
import Loading from "@/components/ui/Loading";
import { Church } from "lucide-react";
import CelebrationCard from "./celebration-card";
import MeetingCard from "./meeting-card";
import SectionTitle from "../section-title";

const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || 'http://206.189.23.60';

export default function Celebrations() {
  const { celebrations, isLoading, error } = useCelebrations();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const structuredData = StructuredDataCelebration(celebrations);

  return (
    <>
      <Script type="application/ld+json" id="json-ld-celebrations">
        {JSON.stringify(structuredData)}
      </Script>
      
      {/* Section avec gradient de fond subtil */}
      <section id="celebrations" className="py-8 bg-gradient-to-br from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Célébrations"
          color="#00AECE"
            icon={Church}
            subtitle="Rejoignez-nous pour des moments de louange, de prière et de communion fraternelle"
          />

          {/* Cartes asymétriques avec grands blocs contrastés */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Carte de culte principale (plus grande) - On utilise le style inline pour le premier élément */}
            {celebrations.length > 0 && (
              <div className="lg:col-span-7">
                <CelebrationCard 
                  {...celebrations[0]} 
                  displayStyle="featured"
                />
              </div>
            )}

            {/* Cartes secondaires (plus petites) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-6">
                {/* Culte secondaire */}
                {celebrations.length > 1 && (
                  <CelebrationCard 
                    {...celebrations[1]} 
                    displayStyle="dark"
                  />
                )}

                {/* Intercession */}
           {/*      <MeetingCard 
                  title="Intercession" 
                  image={`${baseUrl}/images/intercession.jpg`}
                  date="Tous les vendredis"
                  time="19h30"
                  location="Boulogne"
                  variant="amber"
                  badge="Prière"
                /> */}
              </div>
            </div>
          </div>

          {/* Troisième rangée avec étude biblique et rencontre de prière */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Étude biblique */}
            <MeetingCard 
              title="Étude Biblique" 
              image={`${baseUrl}/images/bible.jpg`}
              date="Tous les mardis"
              time="19h00"
              location="Boulogne"
              variant="default"
              layout="imageLeft"
            />

            {/* Rencontre de prière */}
            <MeetingCard 
              title="Intercession" 
              image={`${baseUrl}/images/intercession.jpg`}
              date="Vendredi"
              time="19h00"
              location="Boulogne"
              variant="indigo"
              layout="imageRight"
            />
          </div>

          {/* Bannière CTA */}
     {   <div className="mt-12 bg-gradient-to-r from-[#00AECE] to-[#A3CC2E] rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
  
            <div className="absolute right-0 top-0 h-1/ w-1/3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full text-white opacity-10">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
             <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">Rejoignez nous !</h3>
              <p className="mb-6 text-sky-100">Nous serions ravis de vous accueillir lors de nos prochaines célébrations. Venez partager ces moments de communion fraternelle avec nous.</p>
             {/*  <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-white text-sky-700 px-6 py-2 rounded-lg font-medium hover:bg-sky-50 transition-colors">Nous contacter</a>
                <a href="#" className="bg-transparent text-white border border-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">Voir le calendrier</a>
              </div> */}
            </div> 
          </div>}
        </div>
      </section>
    </>
  );
}