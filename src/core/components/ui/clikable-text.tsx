import React from 'react';
import Linkify from 'linkify-react';
import { ExternalLink } from 'lucide-react';

interface ClickableTextProps {
  text: string;
  className?: string;
}

export default function ClickableText({ text, className = '' }: ClickableTextProps) {
  if (!text) return null;

  const options = {

    target: '_blank',
    rel: 'noopener noreferrer',

    className: "text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 break-all",
    // Personnalisation du rendu de chaque lien avec componentDecorator
    componentDecorator: (decoratedHref: string, decoratedText: string, key: number) => (
      <a
        key={key}
        href={decoratedHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 break-all"
      >
        {decoratedText}
        <ExternalLink className="h-3 w-3 inline opacity-75" />
      </a>
    )
  };

  return (
    <p className={className}>
      <Linkify options={options}>
        {text}
      </Linkify>
    </p>
  );
}
