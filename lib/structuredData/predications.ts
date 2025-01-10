import { PredicationData } from "@/types/predications";

export function StructuredDataPredications(predications: PredicationData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": predications.map((predication, index) => ({
      "@type": "VideoObject",
      "position": index + 1,
      "name": predication.titre,
      "description": `Prédication : ${predication.titre}, publiée le ${new Date(
        predication.date
      ).toLocaleDateString("fr-FR")}`,
      "thumbnailUrl": predication.miniature || `https://img.youtube.com/vi/${predication.youtube_id}/maxresdefault.jpg`,
      "uploadDate": predication.date,
      "contentUrl": `https://www.youtube.com/watch?v=${predication.youtube_id}`,
      "embedUrl": `https://www.youtube.com/embed/${predication.youtube_id}`,
    })),
  };
}
