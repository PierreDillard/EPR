import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loading = ({ size = 'md', className }: LoadingProps) => {

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizes[size])}>
        {/* Point bleu */}
        <div className={cn(
          "absolute rounded-full animate-bounce",
          dotSizes[size],
          "bg-[#00AECE]"
        )} 
        style={{ 
          left: '0%',
          animationDelay: '0ms',
          animationDuration: '1000ms'
        }} 
        />
        
        {/* Point vert */}
        <div className={cn(
          "absolute rounded-full animate-bounce",
          dotSizes[size],
          "bg-[#A8CC3D]"
        )}
        style={{ 
          left: '50%',
          transform: 'translateX(-50%)',
          animationDelay: '200ms',
          animationDuration: '1000ms'
        }} 
        />
        
        {/* Point orange */}
        <div className={cn(
          "absolute rounded-full animate-bounce",
          dotSizes[size],
          "bg-[#FDAC00]"
        )}
        style={{ 
          right: '0%',
          animationDelay: '400ms',
          animationDuration: '1000ms'
        }} 
        />
      </div>
    </div>
  );
};

export default Loading;