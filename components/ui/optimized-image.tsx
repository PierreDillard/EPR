'use client';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface OptimizedImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  fill?: boolean;      
  width?: number;      
  height?: number; 
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  fallbackSrc = "/placeholder.jpg"
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  
  const imageSrc = (!src || src === "" || error) ? fallbackSrc : src;

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setError(true)}
        loading={priority ? "eager" : "lazy"}
        quality={isMobile ? 50 : 75}
      />
    </div>
  );
}