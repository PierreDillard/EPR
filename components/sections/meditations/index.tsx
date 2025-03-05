import Link from "next/link";
import SectionTitle from "../section-title";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { MeditationCard } from "./meditation-card";

interface MeditationSectionProps {
  meditations: Array<{ 
    id: string; 
    title: string; 
    content: string; 
    image_url: string; 
    created_at: string; 
  }>;
}

export default function MeditationSection({ meditations }: MeditationSectionProps) {
  // Si aucune méditation, on affiche un message
  if (!meditations || meditations.length === 0) {
    return (
      <section id="meditations" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Méditation"
            color="#00AECE"
            icon={Sparkles}
            subtitle="Découvrez nos méditations spirituelles"
          />
          <div className="text-center py-12">
            <p>Aucune méditation disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Sélectionner la méditation la plus récente
  const featuredMeditation = meditations[0];

  return (
    <section id="meditations" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Méditation"
          color="#00AECE"
          icon={Sparkles}
          subtitle="Découvrez nos méditations spirituelles"
        />

        <div className="mb-12">
          <MeditationCard meditation={featuredMeditation} />
        </div>

     
      </div>
    </section>
  );
}