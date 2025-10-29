import SectionTitle from "@/core/components/common/SectionTitle";
import { Sparkles } from "lucide-react";
import InstagramStyleMeditation from "./InstagramStyleMeditation";

interface MeditationSectionProps {
  meditations: Array<{
    id: string;
    title: string;
    content?: string;
    image_url?: string;
    created_at: string;
    published: boolean;
  }>;
}

export default function MeditationsSection({ meditations }: MeditationSectionProps) {
  if (!meditations || meditations.length === 0) {
    return (
      <section id="meditations" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Méditation"
            color="#00AECE"
            icon={Sparkles}
            subtitle="Nourrir votre foi"
          />
          <div className="text-center py-12">
            <p>Aucune méditation disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredMeditation = meditations[0];

  return (
    <section id="meditations" className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Méditation"
          color="#00AECE"
          icon={Sparkles}
          subtitle="Pour nourrir votre foi"
        />

        <div className="mt-12">
          <InstagramStyleMeditation meditation={featuredMeditation} />
        </div>
      </div>
    </section>
  );
}
