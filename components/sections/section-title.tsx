import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils/utils";

interface SectionTitleProps {
  title: string;
  color: string;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
  iconClassName?: string;
}

export default function SectionTitle({ 
  title, 
  color, 
  subtitle, 
  icon: Icon,
  className,
  iconClassName
}: SectionTitleProps) {
  return (
    <div className={cn(" mb-16", className)}>
      <div className="flex items-center justify-start gap-4 mb-4 ">
        {Icon && (
          <Icon 
          className={cn(
            "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-all duration-300 text-gray-950 mr-2 ",
            iconClassName
          )}
            style={{ color }} 
          />
        )}
        <h2 
          className="text-4xl font-bold relative py-8
            after:content-[''] after:block after:w-24 after:h-1 
            after:mx-auto after:absolute after:bottom-0 after:left-1/2 
            after:-translate-x-1/2"
            style={{ 
              '--title-underline-color': color,
              '--tw-text-opacity': '1',
            } as React.CSSProperties}
          >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-lg text-gray-600 mt-4 ">
          {subtitle}
        </p>
      )}
    </div>
  );
}