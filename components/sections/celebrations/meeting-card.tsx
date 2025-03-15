import Image from "next/image";
import { MapPin, Clock, Calendar } from "lucide-react";
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from "@/lib/utils/utils";
import OptimizedImage from "@/components/ui/optimized-image";

interface MeetingCardProps {
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  variant?: 'default' | 'dark' | 'amber' | 'indigo';
  layout?: 'standard' | 'imageLeft' | 'imageRight';
  badge?: string;
}

export default function MeetingCard({
  title,
  image,
  date = "Tous les vendredis",
  time = "19h30",
  location = "Boulogne",
  variant = 'default',
  layout = 'standard',
  badge
}: MeetingCardProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Définition des styles en fonction des variantes
  const variantStyles = {
    default: {
      container: "bg-white",
      title: "text-gray-800",
      icon: "text-gray-500",
      text: "text-gray-700",
      badge: "bg-sky-100 text-sky-800"
    },
    dark: {
      container: "bg-slate-800",
      title: "text-white",
      icon: "text-sky-300",
      text: "text-sky-100",
      badge: "bg-slate-600 text-white"
    },
    amber: {
      container: "bg-amber-50",
      title: "text-amber-900",
      icon: "text-amber-500",
      text: "text-amber-800",
      badge: "bg-amber-200 text-amber-800"
    },
    indigo: {
      container: "bg-indigo-50",
      title: "text-indigo-900",
      icon: "text-indigo-600",
      text: "text-indigo-800",
      badge: "bg-indigo-200 text-indigo-800"
    }
  };
  
  const styles = variantStyles[variant];
  

  const hasImageLayout = layout === 'imageLeft' || layout === 'imageRight';
  const imageFirst = layout === 'imageLeft';

  const ImageComponent = () => (
    <div className="w-1/3 relative">
      <OptimizedImage src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  );
  
  if (hasImageLayout) {
    return (
      <div className={`${styles.container} rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 flex h-full`}>
        {imageFirst && <ImageComponent />}
        
        <div className="w-2/3 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-bold ${styles.title}`}>{title}</h3>
            {badge && <span className={`${styles.badge || 'bg-sky-100 text-sky-800'} px-3 py-1 text-sm font-medium rounded-full`}>{badge}</span>}
          </div>
          
          <div className="flex items-center mb-2">
            <Calendar className={`h-5 w-5 ${styles.icon} mr-2`} />
            <span className={styles.text}>{date}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <Clock className={`h-5 w-5 ${styles.icon} mr-2`} />
            <span className={styles.text}>{time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className={`h-5 w-5 ${styles.icon} mr-2`} />
            <span className={styles.text}>{location}</span>
          </div>
        </div>
        
        {!imageFirst && <ImageComponent />}
      </div>
    );
  }
  
  // Layout standard (comme avant mais avec les nouvelles styles)
  return (
    <div className={`${styles.container} rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 h-full`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold ${styles.title}`}>{title}</h3>
          {badge && <span className={`${styles.badge || 'bg-sky-100 text-sky-800'} px-3 py-1 text-sm font-medium rounded-full`}>{badge}</span>}
        </div>
        
        <div className="flex items-center mb-3">
          <Calendar className={`h-5 w-5 ${styles.icon} mr-2`} />
          <span className={styles.text}>{date}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <Clock className={`h-5 w-5 ${styles.icon} mr-2`} />
          <span className={styles.text}>{time}</span>
        </div>
        
        <div className="flex items-center">
          <MapPin className={`h-5 w-5 ${styles.icon} mr-2`} />
          <span className={styles.text}>{location}</span>
        </div>
      </div>
    </div>
  );
}