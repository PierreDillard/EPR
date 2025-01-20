import { cn } from '@/lib/utils/utils';

interface QuoteProps {
  text: string;
  highlightedText?: string;
  gradientColors?: {
    from: string;
    via?: string;
    to: string;
  };
  className?: string;
  separatorClassName?: string;
  textClassName?: string;
}

export default function Quote({
  text,
  highlightedText,
  gradientColors = {
    from: '#00AECE',
    via: '#A8CC3D',
    to: '#FDAC00'
  },
  className,
  separatorClassName,
  textClassName
}: QuoteProps) {
  // Créer le style de gradient directement
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${gradientColors.from} 0%, ${
      gradientColors.via ? `${gradientColors.via} 50%,` : ''
    } ${gradientColors.to} 100%)`
  };

  // Si le texte contient du texte à mettre en évidence, le remplacer
  const formattedText = highlightedText
    ? text.replace(highlightedText, `<span class="font-medium">"${highlightedText}"</span>`)
    : text;

  return (
    <div className={cn(
      "relative max-w-3xl mx-auto my-12 px-6",
      className
    )}>
      {/* Séparateur vertical avec style inline */}
      <div 
        className={cn(
          "absolute left-0 top-0 w-1 h-full rounded-full",
          "!important", // Force le style
          separatorClassName
        )}
        style={gradientStyle}
      />
      
      {/* Contenu de la citation */}
      <blockquote className={cn(
        "pl-8 not-prose", // Ajout de not-prose pour éviter les conflits
        textClassName
      )}>
        <p 
          className="text-lg text-gray-600 italic"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </blockquote>
    </div>
  );
}