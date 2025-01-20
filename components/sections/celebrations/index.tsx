'use client';

import { useCelebrations } from "@/components/hooks/useCelebrations";
import SectionTitle from "@/components/sections/section-title";
import CelebrationCard from "./celebration-card";
import Script from "next/script";
import { StructuredDataCelebration } from "@/lib/structuredData/celebrations";
import Loading from "@/components/ui/Loading";
import MeetingCard from "./meeting-card";
import { Church } from "lucide-react";

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
      
      <section id="celebrations" className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Célébrations"
          color="#00AECE"
            icon={Church}
            subtitle="Rejoignez-nous pour des moments de louange, de prière et de communion fraternelle"
          />
          
          {/* Grille de cartes */}
          <div className="grid md:grid-cols-2 gap-8  ">
            {celebrations.map((celebration, index) => (
              <div 
                key={index}
                className="h-[400px]" 
              >
                <CelebrationCard {...celebration} />
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-16 ">
  <MeetingCard 
    title="Intercession" 
    image={`${baseUrl}/images/intercession.jpg`}
    date="Tous les vendredis"
    time="19h30"
    location="Boulogne"
  />
  <MeetingCard 
    title="Étude Biblique" 
    image={`${baseUrl}/images/bible.jpg`}
    date="Tous les mardis"
    time="19h00"
    location="Boulogne"
  />
</div>
        </div>
      </section>
    </>
  );
}