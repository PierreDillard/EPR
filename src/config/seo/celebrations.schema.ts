import { getNextSunday, setEventTime } from "@/core/utils/dates";
import { CelebrationProps } from "@/features/celebrations/types/celebrations.types";

export function StructuredDataCelebration(celebrations: CelebrationProps[]) {
    const baseDate = getNextSunday(); 
  
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": celebrations.map((celebration) => {
        const eventDate = setEventTime(baseDate, celebration.adresse); 
        return {
          "@type": "Event",
          "name": celebration.lieu,
          "startDate": eventDate.toISOString(),
          "location": {
            "@type": "Place",
            "name": celebration.lieu,
            "address": celebration.adresse,
          },
          "eventStatus": "https://schema.org/EventScheduled",
          "description": `Célébration au ${celebration.lieu}, adresse: ${celebration.adresse}, horaire: ${celebration.horaire}`,
        };
      }),
    };
  }
