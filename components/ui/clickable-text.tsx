"use client";

import React from 'react';
import { cn } from "@/lib/utils/utils";

interface ClickableTextProps {
  text: string;
  className?: string;
}

export function ClickableText({ text, className }: ClickableTextProps) {
  // Convertir les URLs en liens cliquables
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const processedText = text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });

  return (
    <div className={cn("whitespace-pre-wrap", className)}>
      {processedText}
    </div>
  );
}