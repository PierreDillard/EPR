import { Separator } from "@/components/ui/separator"

interface SectionSeparatorProps {
  color: string;
  className?: string;
  direction?: 'left' | 'right' | 'center';
  thickness?: 'thin' | 'medium' | 'thick';
}

export default function SectionSeparator({ 
  color, 
  className,
  direction = 'center',
  thickness = 'medium' 
}: SectionSeparatorProps) {
  // Définir le gradient en fonction de la direction
  const getGradient = () => {
    switch (direction) {
      case 'left':
        return `linear-gradient(90deg, white 0%, ${color} 50%, white 100%)`;
      case 'right':
        return `linear-gradient(90deg, ${color} 0%, white 100%)`;
      case 'center':
      default:
        return `linear-gradient(90deg, white 0%, ${color} 50%, white 100%)`;
    }
  };

  // Définir l'épaisseur
  const getThickness = () => {
    switch (thickness) {
      case 'thin': return '1px';
      case 'thick': return '3px';
      case 'medium':
      default: return '2px';
    }
  };

  const gradientStyle = {
    background: getGradient(),
    height: getThickness(),
    borderRadius: '9999px'
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div 
        className={`w-1/3 ${className}`}
        style={gradientStyle}
      />
    </div>
  );
}