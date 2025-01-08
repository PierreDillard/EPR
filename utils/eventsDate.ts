// Fonction pour trouver le prochain dimanche
export function getNextSunday() {
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7 || 7));
    return nextSunday;
  }
  
  // Fonction pour définir l'heure spécifique pour chaque lieu
  export function setEventTime(baseDate: Date, adresse: string): Date {
    const eventDate = new Date(baseDate); 
    if (adresse === "92100 Boulogne billancourt") {
      eventDate.setHours(10, 30, 0, 0); 
    } else if (adresse === "78000 Versailles") {
      eventDate.setHours(15, 30, 0, 0); 
    }
    return eventDate;
  }
  