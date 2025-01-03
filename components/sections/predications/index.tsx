"use client"

import VideoCard, { VideoProps } from "./video-card"
import SectionTitle from "@/components/sections/section-title"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

interface PredicationData {
 id: number;
 youtube_id: string;
 titre: string;
 date: string;
 miniature: string;
 description: string;
 duration: string;
 vues: number;
 created_at: string;
}

export default function Predications() {
 const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
 const [videos, setVideos] = useState<VideoProps[]>([])

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
   }

   getVideos()
 }, [])

 return (
   <section id="predications" className="py-4">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <SectionTitle 
         title="Prédications"
         color="#00AECE"
         subtitle="Dernières prédications et enseignements"
       />

       {selectedVideo && (
         <div className="mb-6">
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
       
       <div className="text-center mt-4">
         <Button 
           variant="outline"
           className="bg-[#F34325] text-white hover:bg-[#F34325]/90"
           onClick={() => window.open('https://www.youtube.com/@ensemblepourleroyaume', '_blank')}
         >
           Voir plus sur YouTube
         </Button>
       </div>
     </div>
   </section>
 )
}