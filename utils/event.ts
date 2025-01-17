import { EventType } from "@/types/event";


const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL || 'http://206.189.23.60';

 export function getBadgeColor(type: string) {
    switch(type) {
      case 'intercession': return 'bg-[#00AECE]/10 text-[#00AECE] border-[#00AECE]/20';
      case 'formation': return 'bg-[#A8CC3D]/10 text-[#A8CC3D] border-[#A8CC3D]/20';
      case 'celebration': return 'bg-[#FDAC00]/10 text-[#FDAC00] border-[#FDAC00]/20';
      case 'evangelisation': return 'bg-[#0A0A0A]/10 text-[#0A0A0A] border-[#0A0A0A]/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

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