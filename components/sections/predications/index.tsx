"use client"

import VideoCard, { VideoProps } from "./video-card"
import SectionTitle from "@/components/sections/section-title"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const videos: VideoProps[] = [
  {
    id: "QblGGtjvUuQ",
    title: "La puissance de la grâce",
    date: "12 Janvier 2024",
    thumbnail: "https://img.youtube.com/vi/QblGGtjvUuQ/maxresdefault.jpg"
  },
  {
    id: "ySOJgSJceo4",
    title: "Le chemin de la victoire",
    date: "5 Janvier 2024",
    thumbnail: "https://img.youtube.com/vi/ySOJgSJceo4/maxresdefault.jpg"
  },
  {
    id: "nbJgsJVPr7Y",
    title: "La force de la foi",
    date: "29 Décembre 2023",
    thumbnail: "https://img.youtube.com/vi/nbJgsJVPr7Y/maxresdefault.jpg"
  }
]

export default function Predications() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <>
      <section id="predications" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Prédications"
            color="#00AECE"
            subtitle="Retrouvez nos dernières prédications et enseignements"
          />

          {selectedVideo && (
            <div className="mb-12">
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
                  onClick={() => setSelectedVideo(null)}
                >
                  Dernières prédications
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} onClick={() => setSelectedVideo(video.id)}>
                <VideoCard {...video} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              onClick={() => window.open('https://www.youtube.com/@ensemblepourleroyaume', '_blank')}
            >
              Voir plus sur YouTube
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}