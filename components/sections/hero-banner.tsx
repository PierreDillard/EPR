/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"
import Head from "next/head"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import dynamic from 'next/dynamic'

function VideoBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <div className="absolute inset-0 overflow-hidden hidden md:block">
       <Head>
        <title>Vision - Ensemble pour le Royaume</title>
        <meta name="description" content="Découvrez notre vision pour rassembler des chrétiens et avancer ensemble dans le Royaume de Dieu." />
        <meta property="og:title" content="Vision - Ensemble pour le Royaume" />
        <meta property="og:description" content="Découvrez la vision d'ensemble pour le royaume:Atteindre, Restaurer, Libérer, Equiper, Envoyer. " />
        <meta property="og:image" content="/og-vision.jpg" />
        <meta property="og:video" content="/epr.mp4" />
        <meta property="og:type" content="video.other" />
      </Head>
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`object-cover w-full h-full transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="epr.mp4" type="video/mp4" />
        <track kind="captions" src="/captions.vtt" srcLang="fr" label="French" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
}

const DynamicVideoBackground = dynamic(() => Promise.resolve(VideoBackground), {
  ssr: false,
})

export default function HeroBanner() {
  const scrollToVision = () => {
    const visionSection = document.getElementById("vision")
    visionSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Logo Background pour Mobile */}
      <div className="absolute inset-0 md:hidden">
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

      {/* Video Background pour Desktop */}
      <DynamicVideoBackground />

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
              className="text-slate-400 border-white hover:bg-white hover:text-black"
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