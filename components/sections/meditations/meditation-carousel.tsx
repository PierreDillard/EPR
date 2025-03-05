'use client';
import { cn } from "@/lib/utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { MeditationCard } from "./meditation-card";

interface Meditation {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

interface MeditationSectionProps {
  meditations: Meditation[];
}

 export function MeditationCarousel({ meditations }: MeditationSectionProps) {
     
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    
    const itemsToShow = {
      mobile: 1,
      tablet: 2,
      desktop: 3
    };
  
    const nextSlide = () => {
      if (isScrolling) return;
      setIsScrolling(true);
      setActiveIndex(prev => 
        prev + 1 >= meditations.length - (itemsToShow.desktop - 1) ? 0 : prev + 1
      );
      setTimeout(() => setIsScrolling(false), 500);
    };
  
    const prevSlide = () => {
      if (isScrolling) return;
      setIsScrolling(true);
      setActiveIndex(prev => 
        prev - 1 < 0 ? meditations.length - itemsToShow.desktop : prev - 1
      );
      setTimeout(() => setIsScrolling(false), 500);
    };
  

    if (!meditations.length) {
      return (
        <div className="text-center py-12">
          <p>Aucune méditation disponible pour le moment.</p>
        </div>
      );
    }
  
    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div 
           
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${itemsToShow.desktop * 100}%` }}
          >
            {meditations.map((meditation) => (
              <div 
                key={meditation.id} 
                style={{ width: `${100 / itemsToShow.desktop}%` }}
              >
                <MeditationCard meditation={meditation} />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
          aria-label="Précédent"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
          aria-label="Suivant"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
        
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.min(6, meditations.length) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "w-2 h-2 mx-1 rounded-full transition-all",
                activeIndex === i ? "bg-[#00AECE] w-6" : "bg-gray-300"
              )}
              aria-label={`Aller à la méditation ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }