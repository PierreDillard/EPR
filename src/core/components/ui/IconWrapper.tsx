import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const IconWrapper = ({ 
  icon: Icon,
  color = 'primary',
  size = 'md'
}: IconWrapperProps) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const colorMap = {
    primary: 'text-[#00AECE]',
    secondary: 'text-[#A8CC3D]',
    accent: 'text-[#FDAC00]'
  };

  return (
    <div className={`inline-flex items-center justify-center ${colorMap[color]}`}>
      <Icon className={sizeMap[size]} />
    </div>
  );
};

export default IconWrapper;