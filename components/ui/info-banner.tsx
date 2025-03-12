"use client"

import { useState, useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Info {
  id: number;
  created_at: string;
  titre: string;
  contenu: string;
  lien?: string;
  lien_texte?: string;
  type?: "info" | "alerte" | "mission" | "celebration";
  visible?: boolean;
  position?: "top" | "middle" | "bottom" | "dialog";
  couleur_fond?: string;
  couleur_texte?: string;
  icone?: string;
}

interface InfoBannerProps {
  type?: "info" | "alerte" | "mission" | "celebration";
  position?: "top" | "middle" | "bottom" | "dialog";
  className?: string;
}

export function InfoBanner({ 
  type = "info", 
  position = "top",
  className = ""
}: InfoBannerProps) {
  const [info, setInfo] = useState<Info | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchInfo() {
      try {
        const { data, error } = await supabase
          .from('infos')
          .select('*')
          .eq('visible', true)
          .eq('type', type)
          .eq('position', position)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error("Erreur lors de la récupération des infos:", error);
          setIsLoading(false);
          return;
        }

        setInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur inattendue:", error);
        setIsLoading(false);
      }
    }

    fetchInfo();
  }, [supabase, type, position]);

  // Ne rien afficher si nous sommes en chargement ou s'il n'y a pas d'info
  if (isLoading || !info || !isVisible) return null;

  // Détermine les couleurs en fonction du type ou utilise les couleurs personnalisées
  const getBgColor = () => {
    if (info.couleur_fond) return info.couleur_fond;
    
    switch (type) {
      case "info": return "bg-[#00AECE]";
      case "alerte": return "bg-red-500";
      case "mission": return "bg-[#FDAC00]";
      case "celebration": return "bg-[#A8CC3D]";
      default: return "bg-[#00AECE]";
    }
  };

  const getTextColor = () => {
    if (info.couleur_texte) return info.couleur_texte;
    return "text-white";
  };

  // Contenu de base qui sera affiché différemment selon la position
  const bannerContent = (
    <div className={`${getBgColor()} ${getTextColor()} py-3 px-4 shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {info.icone && (
            <span className="hidden md:block">
              <i className={info.icone}></i>
            </span>
          )}
          <div>
            {info.titre && <div className="hidden md:block font-bold">{info.titre}</div>}
            <p className="text-sm md:text-base">{info.contenu}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {info.lien && (
            <Button 
              size="sm" 
              variant="outline" 
              className={`${getTextColor()} border-white hover:bg-white hover:text-[#FDAC00]`}
              asChild
            >
              <a 
                href={info.lien} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                {info.lien_texte || "En savoir plus"} <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
          <button 
            onClick={() => setIsVisible(false)} 
            className={`p-1 rounded-full hover:bg-white/20`}
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Rendu différent selon la position
  if (position === "top") {
    return (
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {bannerContent}
      </motion.div>
    );
  } else if (position === "dialog") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl max-w-md mx-4 overflow-hidden"
        >
          <div className={`${getBgColor()} ${getTextColor()} py-4 px-6`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{info.titre}</h3>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-full hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <p className="mb-6">{info.contenu}</p>
            {info.lien && (
              <Button className={`w-full ${getBgColor()} ${getTextColor()}`} asChild>
                <a 
                  href={info.lien} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  {info.lien_texte || "En savoir plus"} <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  } else if (position === "bottom") {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40"
      >
        {bannerContent}
      </motion.div>
    );
  } else { // Pour "middle" ou toute autre position
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {bannerContent}
      </motion.div>
    );
  }
}