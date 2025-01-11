"use client"

import { useState, useEffect, useRef } from "react"
import VideoCard from "./video-card"
import SectionTitle from "@/components/sections/section-title"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { PredicationData ,VideoProps} from "@/types/predications"
import { StructuredDataPredications } from "@/lib/structuredData/predications"
import Script from "next/script"

export default function Predications() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videos, setVideos] = useState<VideoProps[]>([])
  const [structuredData, setStructuredData] = useState<any>(null)
  const videoPlayerRef = useRef<HTMLDivElement>(null)

  // Fonction pour gérer le scroll vers la vidéo
  const scrollToVideo = () => {
    if (videoPlayerRef.current) {
      const yOffset = -80; // Ajustez cette valeur selon votre header
      const y = videoPlayerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    async function getVideos() {
      const { data, error } = await supabase
        .from('predications')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) {
        console.error('Error fetching videos:', error)
        return
      }

      const formattedVideos = (data as PredicationData[]).map(video => ({
        id: video.youtube_id,
        title: video.titre,
        date: new Date(video.date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        thumbnail: video.miniature || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`
      }))

      setVideos(formattedVideos)
      
      // Mettre à jour les données structurées
      setStructuredData(StructuredDataPredications(data as PredicationData[]))
    }

    getVideos()
  }, [])

  // Gérer la sélection de vidéo et le scroll
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId)
    // Petit délai pour laisser le temps au lecteur de se monter
    setTimeout(scrollToVideo, 100)
  }

  return (
    <section id="predications" className="py-4 bg-gray-50">
      {structuredData && (
        <Script
          id="structured-data-predications"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Prédications"
          color="#00AECE"
          subtitle="Dernières prédications et enseignements"
        />

        {selectedVideo && (
          <div className="mb-6" ref={videoPlayerRef}>
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center mt-4">
              <Button 
                variant="outline"
                className="bg-[#F34325] text-white hover:bg-[#F34325]/90"
                onClick={() => {
                  setSelectedVideo(null)
                  // Scroll vers le haut de la section après la fermeture
                  window.scrollTo({ 
                    top: document.getElementById('predications')?.offsetTop ?? 0,
                    behavior: 'smooth' 
                  })
                }}
              >
                Dernières prédications
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {videos.map((video) => (
            <div key={video.id} onClick={() => handleVideoSelect(video.id)}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 sticky bottom-4">
          <Button 
            variant="outline"
            className="group bg-[#F34325] text-white flex items-center gap-2 
            hover:bg-[#F34325]/90 transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://www.youtube.com/@ensemblepourleroyaume', '_blank')}
          >
            <span className="relative z-10">Voir plus sur YouTube</span>
            <svg className="w-6 h-6 transform transition-all duration-300 group-hover:scale-125" 
                viewBox="0 0 24 24" fill="white">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}