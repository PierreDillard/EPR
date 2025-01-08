import { getNextSunday, setEventTime } from "@/utils/eventsDate";
import { CelebrationProps} from "@/types/celebrations";

export function StructuredDataCelebration(celebrations: CelebrationProps[]) {
    const baseDate = getNextSunday(); // Trouve le prochain dimanche
  
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": celebrations.map((celebration) => {
        const eventDate = setEventTime(baseDate, celebration.adresse); // Définit l'heure spécifique pour chaque lieu
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