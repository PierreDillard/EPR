import { EventType } from "@/types/event";


const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || 'http://206.189.23.60';

// utils/event.ts
export function getDefaultEventImage(type: EventType): string {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';
  
  switch (type) {
    case 'reunion':
      return `${baseUrl}/images/events/reunion.jpg`;
    case 'formation':
      return `${baseUrl}/images/events/formation.jpg`;
    case 'celebration':
      return `${baseUrl}/images/events/celebration.jpg`;
    case 'evangelisation':
      return `${baseUrl}/images/events/evangelisation.jpg`;
    case 'seminaire':
      return `${baseUrl}/images/events/seminaire.jpg`;
    default:
      return `${baseUrl}/images/events/default.jpg`;
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
  //Validation de type d'événement

  const validEventTypes: EventType[] = [
    'reunion',
    'formation',
    'celebration',
    'evangelisation',
    'seminaire'
  ];
  
  export function isValidEventType(type: string): type is EventType {
    return validEventTypes.includes(type as EventType);
  }
  
  export function getValidEventType(type?: string): EventType {
    switch (type) {
      case 'reunion':
      case 'formation':
      case 'celebration':
      case 'evangelisation':
      case 'seminaire':
        return type as EventType;
      default:
        return 'reunion'; // Type par défaut
    }
  }
   export const getImageUrl = (image: string | null) => {
    if (!image) return '/placeholder.jpg';
  
    try {
      // Si c'est un objet stringifié
      if (image.startsWith('{')) {
        const parsed = JSON.parse(image);
        return parsed.path ? `/${parsed.path.replace('./', '')}` : '/placeholder.jpg';
      }
  
      // Si c'est une URL complète
      if (image.startsWith('http')) {
        return image;
      }
  
      // Si c'est un chemin relatif
      if (image.startsWith('./')) {
        return `/${image.slice(2)}`;
      }
  
      // Si c'est déjà un chemin avec slash
      if (image.startsWith('/')) {
        return image;
      }
  
      // Par défaut, ajouter un slash
      return `/${image}`;
    } catch (error) {
      console.error('Error parsing image path:', error);
      return '/placeholder.jpg';
    }
  };