/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Loading from "../ui/Loading"
import { useMediaQuery } from "@/hooks/use-media-query"

function VideoBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  if (videoError) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setIsVideoLoaded(true)}
        onError={() => setVideoError(true)}
        className={`object-cover w-full h-full transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/epr.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default function HeroBanner() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const scrollToVision = () => {
    const visionSection = document.getElementById("vision")
    visionSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Logo Background pour Mobile */}
      {!isDesktop && (
        <div className="absolute inset-0">
          <div className="relative w-full h-3/5">
            <Image
              src="/logo1.jpeg"
              alt="EPR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
      )}

      {/* Video Background pour Desktop uniquement */}
      {isDesktop && <VideoBackground />}

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-end text-white px-4">
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto mb-16">
          {/* Sur mobile, le titre apparaît en dessous du logo */}
          <div className="h-[60vh] md:h-auto" /> {/* Espace réservé pour le logo sur mobile */}
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Ensemble pour le Royaume
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
            Rassembler des chrétiens de différentes dénominations pour l'avancement du Royaume de Dieu
          </p>
          <div className="flex justify-center w-full">
            <Button
              onClick={scrollToVision}
              variant="outline"
              size="lg"
              className="text-gray-100 hover:bg-black hover:text-gray-300 bg-black hover:bg-opacity-90 rounded-2xl"
            >
              Découvrir notre vision
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 animate-bounce">
          <ChevronDown className="h-8 w-8" />
        </div>
      </div>
    </div>
  )
}