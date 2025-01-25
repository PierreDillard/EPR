import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';


interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        loading={priority ? "eager" : "lazy"}
        quality={isMobile ? 50 : 75} 
      />
    </div>
  );
}