
export interface PredicationData {
    id: number;
    youtube_id: string;
    titre: string;
    date: string;
    miniature: string;
    description: string;
    duration: string;
  
    created_at: string;
   }
   export interface VideoProps {
    id: string;         
    title: string;       
    date: string;        
    thumbnail: string;   // Pour stocker miniature
    description?: string; // Optionnel
    duration?: string;    // Optionnel
  }
  

   export interface StatsProps {
    predicationsData: {
      date: string;
    
    }[];
  }
  