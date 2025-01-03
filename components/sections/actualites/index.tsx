"use client"
import SectionTitle from "@/components/sections/section-title"

import NewsCard, { NewsProps } from "./news-card"


const news: NewsProps[] = [
  {
    title: "Célébration de Pâques",
    date: "21 Mars 2024",
    image: "https://images.unsplash.com/photo-1445077100181-a33e9ac94db0",
    description: "Rejoignez-nous pour une célébration spéciale de Pâques avec louange et partage."
  },
  {
    title: "Conférence Jeunesse",
    date: "15 Avril 2024",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    description: "Une journée dédiée aux jeunes avec des ateliers, discussions et moments de partage."
  },
  {
    title: "Formation Leadership",
    date: "1 Mai 2024",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    description: "Formation intensive sur le leadership chrétien et le service dans l'église."
  }
]

export default function Actualites() {
  return (
    <> 
    <section id="actualites" className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
        <SectionTitle 
          title="Actualités"
          color="#FDAC00"
          subtitle=""
        />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}