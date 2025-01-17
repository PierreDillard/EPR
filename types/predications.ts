
export interface PredicationData {
  id: number;
  youtube_id: string;
  titre: string;
  date: string;
  miniature: string;
  description?: string;
  duration?: string;
  created_at: string;
  views?: number;
}
   export interface VideoProps {
    id: string;
    title: string;
    date: string;
    thumbnail: string;
    description?: string;
  }

   export interface StatsProps {
    predicationsData: {
      date: string;
    
    }[];
  }
  export interface Video {
    id: number;
    youtube_id: string;
    title: string;
    description?: string;
    date: string;
    duration: string;
    views: number;
    thumbnail: string;
  }