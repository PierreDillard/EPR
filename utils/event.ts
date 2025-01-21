import { EventType } from "@/types/event";


const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || 'http://206.189.23.60';

  export function getEventImage(type: EventType): string {
    switch (type) {
      case 'intercession':
        return `${baseUrl}/images/intercession.jpg`;
      case 'évangelisation':
        return `${baseUrl}/images/evangelisation.jpg`;
      case 'séminaire':
        return `${baseUrl}/images/seminaire.jpg`;
      default:
        return `${baseUrl}/images/event.webp`;
    }
  }
  
  // Fonction pour formater les dates pour l'édition
  export function formatDateForInput(date: string): string {
    return date.split('T')[0]; // Format YYYY-MM-DD
  }
  
  // Fonction pour formater l'heure pour l'édition
  export function formatTimeForInput(time: string): string {
    // Si l'heure est au format HH:mm:ss, on ne garde que HH:mm
    return time.split(':').slice(0, 2).join(':');
  }

  export const getBadgeColor = (type: string) => {
    switch (type) {
      case 'intercession':
        return 'bg-purple-100 text-purple-800';
      case 'formation':
        return 'bg-blue-100 text-blue-800';
      case 'celebration':
        return 'bg-green-100 text-green-800';
      case 'évangelisation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };