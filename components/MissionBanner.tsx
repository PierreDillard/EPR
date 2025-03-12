// components/MissionBanner.tsx
"use client"

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MissionBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#FDAC00] text-gray-900 py-6 px-4 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 pr-8">
          <h3 className="text-lg md:text-xl font-bold mb-2">Mission Madagascar 2025</h3>
          <p className="text-white/90">
            Soutenez notre mission à Madagascar en participant à notre cagnotte en ligne.
           </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            size="lg" 
            variant="outline" 
            className="text-gray-900 border-white hover:bg-white hover:text-[#FDAC00] whitespace-nowrap"
            asChild
          >
            <a 
              href="https://www.leetchi.com/fr/c/mission-madagascar-je-taime-2025-1455371?utm_source=native&utm_medium=social_sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Participer à la cagnotte <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <button 
            onClick={() => setIsVisible(false)} 
            className="p-1 rounded-full hover:bg-white/20 flex-shrink-0"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}