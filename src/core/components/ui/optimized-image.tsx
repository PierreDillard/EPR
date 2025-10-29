'use client'; 


import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/core/components/ui/skeleton'; 

import { useMediaQuery } from '@/core/hooks/use-media-query'; 


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
  objectFit?: 'cover' | 'contain' | 'fill';
  fillContainer?: boolean; 
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  fallbackSrc = "/placeholder.jpg",
  fill = true,
  width,
  height,
  objectFit = "cover",
  fillContainer = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const imageSrc = (!src || src === "" || error) ? fallbackSrc : src;

 
  const objectFitClass =
    objectFit === 'cover' ? 'object-cover' :
    objectFit === 'contain' ? 'object-contain' :
    'object-fill';

  // Appliquer background si fillContainer est vrai
  const containerStyle = fillContainer
    ? {
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: objectFit,        
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      style={fillContainer ? containerStyle : {}}
    >
      {/* Affiche un skeleton tant que l'image n'est pas chargée */}
      {isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {fillContainer ? (
    
        <Image
          src={imageSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={sizes}
          priority={priority}
          className="opacity-0" // Rendre l'image invisible
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          loading={priority ? 'eager' : 'lazy'}
          quality={isMobile ? 50 : 75}
        />
      ) : (
     
        <Image
          src={imageSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={sizes}
          priority={priority}
          className={`transition-opacity duration-300 ${objectFitClass} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          loading={priority ? 'eager' : 'lazy'}
          quality={isMobile ? 50 : 75}
        />
      )}
    </div>
  );
}
