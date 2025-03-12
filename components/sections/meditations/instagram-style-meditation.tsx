"use client"

import { Card } from "@/components/ui/card";
import OptimizedImage from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface Meditation {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  author?: string;
}

export function InstagramStyleMeditation({ meditation }: { meditation: Meditation }) {
  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Définition des animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Grande image centrée qui occupe environ 2/3 de la page, avec animation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="w-full mb-10"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-lg">
          <OptimizedImage
            src={meditation.image_url || "/images/meditation-default.jpg"}
            alt={meditation.title}
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>
      </motion.div>
      
      {/* Contenu textuel en dessous, avec animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Card className="bg-white shadow border-0 rounded-xl overflow-hidden">
          <div className="p-8 md:p-10">
            {/* En-tête avec date et indicateur */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
                  {formatDate(meditation.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#00AECE] rounded-full"></span>
                <span className="text-sm font-medium text-[#00AECE]">Méditation</span>
              </div>
            </div>
            
            {/* Titre avec une grande taille de police */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-2xl md:text-4xl font-bold leading-tight text-gray-900 mb-8"
            >
              {meditation.title}
            </motion.h2>
            
            {/* Auteur si disponible */}
            {meditation.author && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-700">
                    {meditation.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{meditation.author}</div>
                  <div className="text-sm text-gray-500">Auteur</div>
                </div>
              </motion.div>
            )}
            
            {/* Contenu complet */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed mb-6"
            >
              <div dangerouslySetInnerHTML={{ __html: meditation.content }} />
            </motion.div>
          </div>
        </Card>
      </motion.div>
      
      {/* Éléments décoratifs en arrière-plan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="hidden lg:block absolute bottom-20 left-0 w-48 h-48 bg-[#00AECE]/10 rounded-full blur-3xl -z-10"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="hidden lg:block absolute top-20 right-20 w-32 h-32 bg-[#A8CC3D]/10 rounded-full blur-3xl -z-10"
      ></motion.div>
    </div>
  );
}