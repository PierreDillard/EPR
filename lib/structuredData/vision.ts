import { VisionCard } from "@/types/vision";

export function StructuredDataVision(visionCards: VisionCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Vision - Ensemble pour le Royaume",
    "description": "Notre vision est de rassembler les chrétiens et de participer à l'avancement du Royaume de Dieu.",
    "hasPart": visionCards.map((card) => ({
      "@type": "CreativeWork",
      "name": card.title,
      "description": card.description,
    })),
  };
}
