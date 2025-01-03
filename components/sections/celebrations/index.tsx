"use client"

import { useCelebrations } from "@/components/hooks/useCelebrations";
import CelebrationCard, { CelebrationProps } from "./celebration-card"
import MapView from "./map-view"


export default function Celebrations() {
 
  
  const { celebrations, isLoading, error } = useCelebrations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <section id="celebrations" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold my-4">Nos Célébrations</h2>
          <p className="text-lg text-gray-600">
            Rejoignez-nous pour des moments de louange, de prière et de communion fraternelle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {celebrations.map((celebration, index) => (
            <CelebrationCard key={index} {...celebration} />
          ))}
        </div>

        <MapView />
      </div>
    </section>
  )
}