"use client"

import { useCelebrations } from "@/components/hooks/useCelebrations";
import CelebrationCard from "./celebration-card"
import MapView from "./map-view"

import  SectionTitle  from "@/components/sections/section-title";


export default function Celebrations() {
 
  
  const { celebrations, isLoading, error } = useCelebrations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <> 
    <section id="celebrations" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
        <SectionTitle 
          title="Nos Célébrations"
          color="#A8CC3D"
          subtitle="Rejoignez-nous pour des moments de louange, de prière et de communion fraternelle"
        />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {celebrations.map((celebration, index) => (
            <CelebrationCard key={index} {...celebration} />
          ))}
        </div>

     {/*    <MapView /> */}
      </div>
    </section>

     </>
  )
}